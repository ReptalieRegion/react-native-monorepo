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
        private accessToken: string | null = null,
        private refreshToken: string | null = null,
        private isRefresh: boolean = false,
        private refreshQueue: RefreshItem[] = [],
    ) {
        this.initializeToken();
    }

    clientFetch = async (input: RequestInfo, init?: CustomRequestInit): Promise<Response> => {
        const fetchInfo = this.generatorFetchInfo(input, init);
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

    private initializeToken = async () => {
        this.accessToken = await getAccessToken();
        this.refreshToken = await getRefreshToken();
    };

    private refreshTokenAndRetry = async (fetchInfo: FetchInfo): Promise<Response> => {
        const isRefresh = this.isRefresh;
        const promise = new Promise<Response>((resolve, reject) => {
            const refreshItem = new RefreshItem(resolve, reject, fetchInfo);
            this.refreshQueue.push(refreshItem);
        });

        if (!isRefresh) {
            this.isRefresh = true;
            const response = await fetch('api/auth/refresh', {
                ...this.init,
                headers: {
                    ...this.init.headers,
                    Authorization: `Bearer ${this.refreshToken}`,
                },
            });

            if (!response.ok) {
                this.resetRefreshQueue();
                const error = await response.json();
                throw new HTTPError(response.status, error.message);
            }

            const tokens = (await response.json()) as RefreshToken['Response'];
            await this.setToken(tokens);
            this.refetch();
            this.isRefresh = false;
        }

        return promise;
    };

    private refetch = () => {
        const refreshQueue = this.refreshQueue;
        refreshQueue.forEach(({ getItem }) => {
            const { fetchInfo, reject, resolve } = getItem();
            const { input, init } = fetchInfo;
            fetch(input, {
                ...init,
                headers: {
                    ...init.headers,
                    Authorization: `Bearer ${this.accessToken}`,
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

    private setToken = async (tokens: RefreshToken['Response']) => {
        this.accessToken = tokens.accessToken;
        this.refreshToken = tokens.refreshToken;
        await registerAuthTokens(tokens);
    };

    private generatorFetchInfo = (input: RequestInfo, init?: CustomRequestInit): FetchInfo => {
        const defaultInit = this.init;

        if (init) {
            const { method, ignorePrefix, isFormData, body, headers, credentials, ...rest } = init;
            const newMethod = method ? method : defaultInit.method;
            const url = ignorePrefix ? input : ENV.END_POINT_URI + input;
            const newCredentials = credentials ? credentials : defaultInit.credentials;
            const newBody = body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined;

            const newHeaders = Object.assign(
                {},
                isFormData ? undefined : defaultInit.headers,
                this.accessToken === null
                    ? {}
                    : {
                          Authorization: `Bearer ${this.accessToken}`,
                      },
                headers,
            );

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
            init: defaultInit,
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
