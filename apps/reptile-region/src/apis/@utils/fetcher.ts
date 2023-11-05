import ENV from '../../env';
import { deleteAuthTokens, getAccessToken, getRefreshToken, registerAuthTokens } from '../auth/utils/secure-storage-token';

import HTTPError from './error/HTTPError';

import type { RefreshToken } from '<api/auth>';

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
} as const;

interface CustomRequestInit extends Omit<RequestInit, 'method' | 'body'> {
    method?: keyof typeof METHOD;
    body?: { [key: string]: unknown } | FormData;
    ignorePrefix?: boolean;
    isFormData?: boolean;
}

type FetchInfo = { input: RequestInfo; init: RequestInit };

interface RefreshItem {
    resolve: (value: Response | PromiseLike<Response>) => void;
    reject: (reason?: any) => void;
    fetchInfo: FetchInfo;
}

class Fetcher {
    constructor(
        private init: RequestInit,
        private isRefresh: boolean = false,
        private refreshQueue: RefreshItem[] = [],
    ) {}

    clientFetch = async (input: RequestInfo, init?: CustomRequestInit): Promise<Response> => {
        const fetchInfo = await this.generatorFetchInfo(input, init);
        const response = await fetch(fetchInfo.input, fetchInfo.init);

        if (response.status === 401) {
            return this.refreshTokenAndRetry(fetchInfo);
        }

        if (!response.ok) {
            const error = await response.json();
            throw new HTTPError(response.status, error.message);
        }

        return response;
    };

    private refreshTokenAndRetry = async (fetchInfo: FetchInfo): Promise<Response> => {
        const refreshToken = await getRefreshToken();
        const promise = new Promise<Response>((resolve, reject) => {
            this.refreshQueue.push({ resolve, reject, fetchInfo });
        });

        if (!this.isRefresh) {
            this.isRefresh = true;
            const input = 'api/auth/refresh';
            const init: CustomRequestInit = {
                method: METHOD.POST,
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            };
            const refreshFetchInfo = await this.generatorFetchInfo(input, init);
            const response = await fetch(refreshFetchInfo.input, refreshFetchInfo.init);

            if (!response.ok) {
                const data = await response.json();
                await deleteAuthTokens();
                await this.rejectRefreshQueue(new HTTPError(response.status, data.message));
            } else {
                const tokens = (await response.json()) as RefreshToken['Response'];
                await registerAuthTokens(tokens);
                await this.refetch(tokens.accessToken);
            }
            this.isRefresh = false;
        }

        return promise;
    };

    private refetch = async (accessToken: string) => {
        const refreshQueue = this.refreshQueue;
        const refetchFunction = refreshQueue.map(async ({ fetchInfo, reject, resolve }) => {
            try {
                const { input, init } = fetchInfo;
                const response = await fetch(input, {
                    ...init,
                    headers: { ...init.headers, Authorization: `Bearer ${accessToken}` },
                });

                if (!response.ok) {
                    const data = await response.json();
                    reject(new HTTPError(response.status, data.message));
                }

                resolve(response);
            } catch (error) {
                reject(new Error('네트워크 에러'));
            }
        });
        await Promise.all(refetchFunction);
        this.resetRefreshQueue();
    };

    private rejectRefreshQueue = async (error: HTTPError) => {
        const refreshQueue = this.refreshQueue;
        const rejectFunction = refreshQueue.map(({ reject }) => reject(error));
        await Promise.all(rejectFunction);
        this.resetRefreshQueue();
    };

    private resetRefreshQueue = () => {
        this.refreshQueue = [];
    };

    private generatorFetchInfo = async (input: RequestInfo, init?: CustomRequestInit): Promise<FetchInfo> => {
        const defaultInit = this.init;
        const accessToken = await getAccessToken();
        const accessTokenHeader =
            accessToken === null
                ? {}
                : {
                      Authorization: `Bearer ${accessToken}`,
                  };

        if (init) {
            const { method, ignorePrefix, isFormData, body, headers, credentials, ...rest } = init;
            const newMethod = method ? method : defaultInit.method;
            const url = ignorePrefix ? input : ENV.END_POINT_URI + input;
            const newCredentials = credentials ? credentials : defaultInit.credentials;
            const newBody = body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined;
            const newHeaders = Object.assign({}, isFormData ? undefined : defaultInit.headers, accessTokenHeader, headers);

            return {
                input: url,
                init: {
                    ...defaultInit,
                    ...rest,
                    method: newMethod,
                    body: newBody,
                    headers: newHeaders,
                    credentials: newCredentials,
                },
            };
        }

        return {
            input: ENV.END_POINT_URI + input,
            init: {
                ...defaultInit,
                headers: Object.assign({}, defaultInit.headers, accessTokenHeader),
            },
        };
    };
}

const fetcher = new Fetcher({
    method: METHOD.GET,
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default fetcher.clientFetch;
