import { encryptionRSA } from '@reptile-region/utils';

import type { JoinProgress, NicknameDuplicateCheck, PostAppleAuth, PostKakaoAuth, RefreshToken } from '<api/auth>';
import clientFetch, { METHOD } from '@/apis/@utils/fetcher';

/** GET */
// 닉네임 중복 체크
export const nicknameDuplicateCheck = async ({ nickname }: NicknameDuplicateCheck['Request']) => {
    const response = await clientFetch(`api/users/duplicate/nickname/${nickname}`, {
        method: METHOD.GET,
    });

    return response.json();
};

/** POST */
// 인증 토큰 및 공개 키 발급
export const getAuthTokenAndPublicKey = async () => {
    const response = await clientFetch('api/auth/social/token', {
        method: METHOD.POST,
    });

    return response.json();
};

// 토큰 재발급
export const refreshTokenIssued = async ({ refreshToken }: RefreshToken['Request']) => {
    const response = await clientFetch('api/auth/refresh', {
        method: METHOD.POST,
        headers: {
            Authorization: `Bearer ${refreshToken}`,
        },
    });

    return await response.json();
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
export const googleAuthLogin = async () => {
    return;
};

// 애플 로그인
export const appleAuthLogin = async ({ authToken, publicKey, socialId }: PostAppleAuth['Request']) => {
    console.log(socialId);
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

/** DELETE */
export const signOut = async () => {
    const response = await clientFetch('api/auth/sign-out', {
        method: METHOD.DELETE,
    });

    return response.json();
};
