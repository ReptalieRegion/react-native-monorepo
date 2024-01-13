import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';

import useRestore from './mutations/useRestore';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import useAlert from '@/components/overlay/Alert/useAlert';
import useToast from '@/components/overlay/Toast/useToast';
import { useAuthHandler } from '@/hooks/auth';
import type { AuthProviderType, PostAppleAuth, PostGoogleAuth, PostKakaoAuth, SignUpRegister0 } from '@/types/apis/auth';
import type { SignInNavigationProp } from '@/types/routes/props/auth/sign-in';

export default function useAuthOptions(provider: AuthProviderType) {
    const openToast = useToast();
    const openAlert = useAlert();
    const restoreAPI = useRestore();
    const authTokenAndPublicKeyAPI = useAuthTokenAndPublicKey();

    const { signIn } = useAuthHandler();
    const navigation = useNavigation<SignInNavigationProp>();

    const navigateSignUpPage = useCallback(
        (data: Omit<SignUpRegister0, 'type'>) => {
            switch (data.joinProgress) {
                case 'REGISTER0':
                    navigation.navigate('sign-up', {
                        screen: 'step1',
                        params: {
                            user: {
                                id: data.userId,
                                recommendNickname: data.nickname,
                            },
                        },
                    });
            }
        },
        [navigation],
    );

    const authSuccess = useCallback(
        async (data: PostKakaoAuth['Response'] | PostAppleAuth['Response'] | PostGoogleAuth['Response']) => {
            switch (data.type) {
                case 'SIGN_IN':
                    await signIn(data);
                    navigation.navigate('bottom-tab/routes', {
                        screen: 'tab',
                        params: {
                            screen: 'me/routes',
                            params: {
                                screen: 'bottom-tab/list',
                            },
                        },
                    });
                    return;
                case 'SIGN_UP':
                    navigateSignUpPage({
                        joinProgress: data.joinProgress,
                        nickname: data.nickname,
                        userId: data.userId,
                    });
                    return;
            }
        },
        [navigateSignUpPage, signIn, navigation],
    );

    const authError = useCallback(
        (error: HTTPError, variables: PostGoogleAuth['Request'] | PostAppleAuth['Request'] | PostKakaoAuth['Request']) => {
            if (error.code === -1401) {
                openAlert({
                    title: '회원탈퇴한 아이디예요',
                    contents: '복구를 진행할까요?',
                    buttons: [
                        {
                            text: '취소',
                            style: 'cancel',
                        },
                        {
                            text: '복구',
                            style: 'default',
                            onPress: async () => {
                                switch (provider) {
                                    case 'kakao':
                                        const kakaoVariables = variables as PostKakaoAuth['Request'];
                                        restoreAPI.mutate({
                                            ...kakaoVariables,
                                            provider: 'kakao',
                                        });
                                        break;
                                    case 'apple':
                                        const appleVariables = variables as PostAppleAuth['Request'];
                                        restoreAPI.mutate({
                                            ...appleVariables,
                                            provider: 'apple',
                                        });
                                        break;
                                    case 'google':
                                        const googleVariables = variables as PostGoogleAuth['Request'];
                                        const { authToken, publicKey } = await authTokenAndPublicKeyAPI.mutateAsync();
                                        restoreAPI.mutate({
                                            socialId: googleVariables.idToken,
                                            authToken,
                                            publicKey,
                                            provider: 'google',
                                        });
                                        break;
                                }
                            },
                        },
                    ],
                });
            } else {
                openToast({ severity: 'error', contents: '알 수 없는 에러가 발생했습니다.' });
            }
        },
        [openAlert, openToast, provider, restoreAPI, authTokenAndPublicKeyAPI],
    );

    return {
        authSuccess,
        authError,
    };
}
