import type { METHOD } from './constants';

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

export type { CustomRequestInit, FetchInfo, RefreshItem };
