import { encryptionRSA } from '@crawl/utils';

import { getRefreshToken } from './utils/secure-storage-token';

import clientFetch, { METHOD } from '@/apis/@utils/fetcher';
import type {
    JoinProgress,
    NicknameDuplicateCheck,
    PostAppleAuth,
    PostGoogleAuth,
    PostKakaoAuth,
    Restore,
} from '@/types/apis/auth';

/** GET */
// 닉네임 중복 체크
export const nicknameDuplicateCheck = async ({ nickname }: NicknameDuplicateCheck['Request']) => {
    const response = await clientFetch(`api/users/duplicate/nickname/${nickname}`, {
        method: METHOD.GET,
    });

    return response.json();
};

// 로그인 체크
export const signInCheck = async () => {
    const response = await clientFetch('api/auth/sign-in/check', {
        method: METHOD.GET,
    });

    return response.json();
};

/**
 *
 * POST
 * */
// 인증 토큰 및 공개 키 발급
export const getAuthTokenAndPublicKey = async () => {
    const response = await clientFetch('api/auth/social/token', {
        method: METHOD.POST,
    });

    return response.json();
};

export const restore = async ({ publicKey, socialId, authToken, provider }: Restore['Request']) => {
    const encryptedData = encryptionRSA(publicKey, socialId);

    const response = await clientFetch('api/auth/restore', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: {
            encryptedData,
            provider,
        },
    });

    return response.json();
};

// 리프레시 토큰 갱신
export const refreshTokenIssued = async () => {
    const refreshToken = await getRefreshToken();
    const response = await clientFetch('api/auth/refresh', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    return response.json();
};

// 카카오 로그인
export const kakaoAuthLogin = async ({ authToken, publicKey, socialId }: PostKakaoAuth['Request']) => {
    const encryptedData = encryptionRSA(publicKey, socialId);

    const response = await clientFetch('api/auth/social/kakao', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: {
            encryptedData,
        },
    });

    return response.json();
};

// 구글 로그인
export const googleAuthLogin = async ({ idToken }: PostGoogleAuth['Request']) => {
    const response = await clientFetch('api/auth/social/google', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${idToken}`,
        },
    });

    return response.json();
};

// 애플 로그인
export const appleAuthLogin = async ({ authToken, publicKey, socialId }: PostAppleAuth['Request']) => {
    const encryptedData = encryptionRSA(publicKey, socialId);

    const response = await clientFetch('api/auth/social/apple', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${authToken}`,
        },
        body: {
            encryptedData,
        },
    });

    return response.json();
};

// 회원가입 진행 단계에 따른 데이터 저장
export const joinProgress = async (data: JoinProgress['Request']) => {
    const body = _joinProgressBodyGenerator(data);
    const response = await clientFetch('api/auth/social/join-progress', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${data.authToken}`,
        },
        body,
    });

    return response.json();
};

const _joinProgressBodyGenerator = (data: JoinProgress['Request']) => {
    switch (data.joinProgress) {
        case 'REGISTER0':
            return {
                userId: data.userId,
                joinProgress: data.joinProgress,
                nickname: data.nickname,
            };
        default:
            throw new Error('[Join Progress]: 잘못된 JoinProgress 입니다.');
    }
};

/**
 *
 * DELETE
 * */
export const signOut = async () => {
    const response = await clientFetch('api/auth/sign-out', {
        method: METHOD.DELETE,
    });

    return response.json();
};

export const withdrawal = async () => {
    const response = await clientFetch('api/auth/withdrawal', {
        method: METHOD.DELETE,
    });

    return response.json();
};
