import AsyncStorage from '@react-native-async-storage/async-storage';

import ENV from '../env';

import { AUTH_KEYS } from '@/env/constants';

export const METHOD = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
    PUT: 'PUT',
} as const;

interface IRequestInit extends Omit<RequestInit, 'method' | 'body'> {
    method?: keyof typeof METHOD;
    body?: object;
    ignorePrefix?: boolean;
    isFormData?: boolean;
}

const DEFAULT_HEADER: HeadersInit_ = {
    'Content-Type': 'application/json',
};

const clientFetch = async (input: RequestInfo, init?: IRequestInit): Promise<Response> => {
    const isFormData = init?.isFormData;
    const url = init?.ignorePrefix ? input : ENV.END_POINT_URI + input;
    delete init?.ignorePrefix;
    delete init?.isFormData;
    const newMethod = init?.method ?? 'GET';
    const newBody = init?.body ? (isFormData ? (init.body as FormData) : JSON.stringify(init.body)) : undefined;
    const authCookies = await AsyncStorage.multiGet(AUTH_KEYS);
    const authCookiesMap = authCookies ? Object.fromEntries(authCookies) : {};
    const newHeaders = isFormData ? undefined : Object.assign({}, DEFAULT_HEADER, init?.headers, authCookiesMap);
    const newCredentials = init?.credentials ?? 'include';
    const newInit: RequestInit = {
        ...init,
        headers: newHeaders,
        credentials: newCredentials,
        method: newMethod,
        body: newBody,
    };

    return fetch(url, newInit);
};

export default clientFetch;
