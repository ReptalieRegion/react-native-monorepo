import ENV from '../../env';
import { getAccessToken, getRefreshToken, registerAuthTokens } from '../auth/utils/secure-storage-token';

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

class RefreshItem {
    constructor(
        private resolve: (value: Response | PromiseLike<Response>) => void,
        private reject: (reason?: any) => void,
        private fetchInfo: FetchInfo,
    ) {}

    getItem() {
        const { reject, resolve, fetchInfo } = this;
        return { reject, resolve, fetchInfo };
    }
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

        if (!response.ok) {
            if (response.status === 401) {
                return this.refreshTokenAndRetry(fetchInfo);
            }
            const error = await response.json();
            throw new HTTPError(response.status, error.message);
        }

        return response;
    };

    private refreshTokenAndRetry = async (fetchInfo: FetchInfo): Promise<Response> => {
        const isRefresh = this.isRefresh;
        const promise = new Promise<Response>((resolve, reject) => {
            const refreshItem = new RefreshItem(resolve, reject, fetchInfo);
            this.refreshQueue.push(refreshItem);
        });

        if (!isRefresh) {
            this.isRefresh = true;
            const refreshToken = await getRefreshToken();
            const response = await fetch('api/auth/refresh', {
                ...this.init,
                headers: {
                    ...this.init.headers,
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            if (!response.ok) {
                this.resetRefreshQueue();
                const error = await response.json();
                throw new HTTPError(response.status, error.message);
            }

            const tokens = (await response.json()) as RefreshToken['Response'];
            await registerAuthTokens(tokens);
            this.refetch(tokens.accessToken);
            this.isRefresh = false;
        }

        return promise;
    };

    private refetch = (accessToken: string) => {
        const refreshQueue = this.refreshQueue;
        refreshQueue.forEach(({ getItem }) => {
            const { fetchInfo, reject, resolve } = getItem();
            const { input, init } = fetchInfo;
            fetch(input, {
                ...init,
                headers: {
                    ...init.headers,
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => resolve(response.json()))
                .catch((error) => reject(error));
        });
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
