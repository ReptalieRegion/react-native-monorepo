import { encryptionRSA } from '@reptile-region/utils';

import HTTPError from '../@utils/error/HTTPError';

import { getRefreshToken } from './utils/secure-storage-token';

import type { PostKakaoAuth, RefreshToken } from '<api/auth>';
import clientFetch, { METHOD } from '@/apis/@utils/fetcher';

/** Post */
// 인증 토큰 및 공개 키 발급
export const getAuthTokenAndPublicKey = async () => {
    const response = await clientFetch('api/auth/social/token', {
        method: METHOD.POST,
    });

    return response.json();
};
// 토큰 재발급
export const refreshToken = async () => {
    const refreshTokenValue = await getRefreshToken();
    if (refreshTokenValue === null) {
        return;
    }

    const response = await fetch('api/auth/refresh', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${refreshTokenValue}`,
        },
    });

    if (!response.ok) {
        throw new HTTPError(response.status, response.statusText);
    }

    const data = (await response.json()) as RefreshToken['Response'];

    return data;
};

// 카카오 로그인
export const kakaoAuthLogin = async ({ authToken, publicKey, socialId }: PostKakaoAuth['Request']) => {
    const encryptedSocial = encryptionRSA(publicKey, socialId);
    const response = await clientFetch('api/auth/social/kakao', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: {
            encryptedSocial,
        },
    });

    return response.json();
};

// 구글 로그인
export const googleAuthLogin = async () => {
    return;
};

// 애플 로그인
export const appleAuthLogin = async () => {
    return;
};
