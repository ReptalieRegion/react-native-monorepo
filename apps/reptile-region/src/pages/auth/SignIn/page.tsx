import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import SignInLogo from './components/SignInLogo';
import SignInTemplates, { type SocialButtons } from './components/SignInTemplates';

import { registerAuthTokens } from '@/apis/auth/utils/secure-storage-token';
import useToast from '@/components/overlay/Toast/useToast';
import { useAuthHandler } from '@/hooks/auth';
import type { PostAppleAuth, PostKakaoAuth, SignUpRegister0 } from '@/types/apis/auth';
import type { RootRoutesParamList } from '@/types/routes/param-list';

type SignInScreenProps = NativeStackScreenProps<RootRoutesParamList, 'sign-in'>;

const SignInPage = ({ navigation, route: { params } }: SignInScreenProps) => {
    const openToast = useToast();
    const { signIn } = useAuthHandler();

    const navigateSignUpPage = (data: Omit<SignUpRegister0, 'type'>) => {
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

                return;
        }
    };

    /** 카카로 로그인 시작 */
    const handleSuccessAuth = async (data: PostKakaoAuth['Response'] | PostAppleAuth['Response']) => {
        switch (data.type) {
            case 'SIGN_IN':
                await registerAuthTokens(data);
                signIn();
                if (params.successNavigate === 'BACK') {
                    navigation.goBack();
                } else {
                    navigation.navigate('bottom-tab/routes', {
                        screen: 'tab',
                        params: {
                            screen: 'me/routes',
                            params: {
                                screen: 'bottom-tab/list',
                            },
                        },
                    });
                }
                return;
            case 'SIGN_UP':
                navigateSignUpPage({
                    joinProgress: data.joinProgress,
                    nickname: data.nickname,
                    userId: data.userId,
                });
                return;
        }
    };

    const handleError = () => {
        openToast({ severity: 'error', contents: '알 수 없는 에러가 발생했습니다.' });
    };

    const buttons: SocialButtons = Platform.select({
        ios: [
            {
                type: 'KAKAO',
                onSuccess: handleSuccessAuth,
                onError: handleError,
            },
            {
                type: 'APPLE',
                onSuccess: handleSuccessAuth,
                onError: handleError,
            },
        ],
        android: [
            {
                type: 'KAKAO',
                onSuccess: handleSuccessAuth,
                onError: handleError,
            },
            {
                type: 'GOOGLE',
                onSuccess: handleSuccessAuth,
                onError: handleError,
            },
        ],
        default: [
            {
                type: 'KAKAO',
                onSuccess: handleSuccessAuth,
                onError: handleError,
            },
        ],
    });

    return <SignInTemplates logo={<SignInLogo />} buttons={buttons} />;
};

export default SignInPage;
