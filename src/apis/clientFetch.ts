import ENV from '@/env';

type TMethod = 'GET' | 'POST' | 'DELETE' | 'PUT';

interface IRequestInit extends Omit<RequestInit, 'method' | 'body'> {
    method?: TMethod;
    body?: object;
    ignorePrefix?: boolean;
}

const DEFAULT_HEADER: HeadersInit_ = {
    'Content-Type': 'application/json',
};

const clientFetch = async (input: RequestInfo, init?: IRequestInit): Promise<Response> => {
    const url = init?.ignorePrefix ? input : ENV.END_POINT_URI + input;
    delete init?.ignorePrefix;
    const newMethod = init?.method ?? 'GET';
    const newBody = init?.body ? JSON.stringify(init.body) : undefined;
    const newHeaders = { ...DEFAULT_HEADER, ...init?.headers };
    const newCredentials = init?.credentials ? init.credentials : 'include';
    const newInit: RequestInit = {
        ...init,
        headers: newHeaders,
        credentials: newCredentials,
        method: newMethod,
        body: newBody,
    };

    const response = await fetch(url, newInit);
    return response;
};

export default clientFetch;
