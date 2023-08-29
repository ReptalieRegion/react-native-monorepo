import AsyncStorage from '@react-native-async-storage/async-storage';

import clientFetch from '../clientFetch';

import type { RequestSignIn } from '<AuthRequest>';
import { AUTH_KEYS } from '@/env/constants';
import { parseCookies } from '@/utils/network/parseCookies';

export const signIn = async (data: RequestSignIn) => {
    const response = await clientFetch('api/auth/sign-in', {
        method: 'POST',
        body: data,
    });

    const setCookieHeader = response.headers.get('Set-Cookie');
    const parsedCookies = parseCookies({ setCookieHeader, findCookie: AUTH_KEYS });
    if (parsedCookies) {
        await AsyncStorage.multiSet(Object.entries(parsedCookies));
    }

    return response.json();
};
