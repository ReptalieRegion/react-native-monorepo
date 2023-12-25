import { METHOD } from './constants';
import type { CustomRequestInit, FetchInfo, RefreshItem } from './types';

import HTTPError from '@/apis/@utils/error/HTTPError';
import TokenRefreshError from '@/apis/@utils/error/TokenRefreshError';
import { deleteAuthTokens, getAccessToken, getRefreshToken, registerAuthTokens } from '@/apis/auth/utils/secure-storage-token';
import ENV from '@/env';
import type { RefreshToken } from '@/types/apis/auth';

/**
 * 전역으로 하나만 있는 custom한 fetch
 */
function fetcher() {
    const baseInit: RequestInit = {
        method: METHOD.GET,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    let isRefresh: boolean = false;
    let refreshQueue: RefreshItem[] = [];
    let failCallback: null | (() => void) = null;

    const resetRefreshQueue = () => {
        refreshQueue = [];
    };

    const rejectRefreshQueue = async (error: TokenRefreshError) => {
        const rejectFunction = refreshQueue.map(({ reject }) => reject(error));
        await Promise.all(rejectFunction);
        resetRefreshQueue();
    };

    const refetch = async (accessToken: string) => {
        const refetchFunction = refreshQueue.map(async ({ fetchInfo, reject, resolve }) => {
            try {
                const { input, init } = fetchInfo;
                const response = await fetch(input, {
                    ...init,
                    headers: { ...init.headers, Authorization: `Bearer ${accessToken}` },
                });

                if (!response.ok) {
                    const data = await response.json();
                    reject(new TokenRefreshError(data.message, response.status));
                }

                resolve(response);
            } catch (error) {
                reject(new TokenRefreshError((error as any)?.message ?? 'refresh fail'));
            }
        });
        await Promise.all(refetchFunction);
        resetRefreshQueue();
    };

    const generatorFetchInfo = async (input: RequestInfo, init?: CustomRequestInit): Promise<FetchInfo> => {
        const accessToken = await getAccessToken();
        const accessTokenHeader =
            accessToken === null
                ? {}
                : {
                      Authorization: `Bearer ${accessToken}`,
                  };

        if (init) {
            const { method, ignorePrefix, isFormData, body, headers, credentials, ...rest } = init;
            const newMethod = method ? method : baseInit.method;
            const url = ignorePrefix ? input : ENV.END_POINT_URI + input;
            const newCredentials = credentials ? credentials : baseInit.credentials;
            const newBody = body ? (isFormData ? (body as FormData) : JSON.stringify(body)) : undefined;
            const newHeaders = Object.assign({}, isFormData ? undefined : baseInit.headers, accessTokenHeader, headers);

            return {
                input: url,
                init: {
                    ...baseInit,
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
                ...baseInit,
                headers: Object.assign({}, baseInit.headers, accessTokenHeader),
            },
        };
    };

    const refreshTokenAndRetry = async (fetchInfo: FetchInfo): Promise<Response> => {
        const refreshToken = await getRefreshToken();
        const promise = new Promise<Response>((resolve, reject) => {
            refreshQueue.push({ resolve, reject, fetchInfo });
        });

        if (!isRefresh) {
            isRefresh = true;

            const { init, input } = await generatorFetchInfo('api/auth/refresh', {
                method: METHOD.POST,
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });
            const response = await fetch(input, init);

            if (!response.ok) {
                const data = await response.json();
                failCallback?.();
                rejectRefreshQueue(new TokenRefreshError(data.message, response.status));
                deleteAuthTokens();
            } else {
                const tokens = (await response.json()) as RefreshToken['Response'];
                registerAuthTokens(tokens);
                refetch(tokens.accessToken);
            }

            isRefresh = false;
        }

        return promise;
    };

    return {
        /**
         * 🚫 다른 곳에서 호출 금지 - 리프레시 갱신 실패했을 때 AuthProvider를 로그아웃해주는 역할만 함
         * @description 리프레시 토큰금지갱신 실패시 실행할 함수 초기화 - AuthProvider에서 초기화
         */
        initRefreshFailCallback: (callback: () => void) => {
            if (failCallback == null) {
                failCallback = callback;
            } else {
                console.log('[fetcher] initRefreshFailCallback은 AuthProvider에서만 호출해주세요');
            }
        },
        clientFetch: async (input: RequestInfo, init?: CustomRequestInit) => {
            const fetchInfo = await generatorFetchInfo(input, init);
            const response = await fetch(fetchInfo.input, fetchInfo.init);

            if (response.status === 401) {
                return refreshTokenAndRetry(fetchInfo);
            }

            if (!response.ok) {
                const error = await response.json();
                throw new HTTPError(response.status, error.message);
            }

            return response;
        },
    };
}

export default fetcher();
