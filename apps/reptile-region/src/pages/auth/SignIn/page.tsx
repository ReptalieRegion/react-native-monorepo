import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import type { PostAppleAuth, PostKakaoAuth, SignUpRegister0 } from '<api/auth>';
import type { RootRoutesParamList } from '<routes/root>';
import { useToast } from '@/components/@common/organisms/Toast';
import SignInLogo from '@/components/auth/atoms/SignInLogo/SignInLogo';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import SignInTemplates, { type SocialButtons } from '@/components/auth/templates/SignInTemplates';

type SignInScreenProps = NativeStackScreenProps<RootRoutesParamList, 'sign-in'>;

const SignInPage = ({ navigation }: SignInScreenProps) => {
    const { openToast } = useToast();
    const { signIn } = useAuth();

    const navigateSignUpPage = (data: Omit<SignUpRegister0, 'type'>) => {
        switch (data.joinProgress) {
            case 'REGISTER0':
                navigation.navigate('sign-up', {
                    screen: 'step1',
                    params: {
                        recommendNickname: data.nickname,
                        userId: data.userId,
                    },
                });
                return;
        }
    };

    /** 카카로 로그인 시작 */
    const handleSuccessAuth = async (data: PostKakaoAuth['Response'] | PostAppleAuth['Response']) => {
        switch (data.type) {
            case 'SIGN_IN':
                await signIn({ accessToken: data.accessToken, refreshToken: data.refreshToken });
                navigation.navigate('bottom-tab/routes', {
                    screen: 'tab',
                    params: {
                        screen: 'my/routes',
                        params: {
                            screen: 'my/list',
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
    };
    const handleErrorKakao = () => {
        openToast({ severity: 'error', contents: '알 수 없는 에러가 발생했습니다.' });
    };
    /** 카카로 로그인 끝 */

    /** 구글 로그인 시작 */
    const handleSuccessGoogle = () => {};
    const handleErrorGoogle = () => {};
    /** 구글 로그인 끝 */

    /** 애플 로그인 시작 */

    const handleErrorApple = () => {};
    /** 애플 로그인 끝 */

    const buttons: SocialButtons = Platform.select({
        ios: [
            {
                type: 'KAKAO',
                onSuccess: handleSuccessAuth,
                onError: handleErrorKakao,
            },
            {
                type: 'APPLE',
                onSuccess: handleSuccessAuth,
                onError: handleErrorApple,
            },
        ],
        android: [
            {
                type: 'KAKAO',
                onSuccess: handleSuccessAuth,
                onError: handleErrorKakao,
            },
            {
                type: 'GOOGLE',
                onSuccess: handleSuccessGoogle,
                onError: handleErrorGoogle,
            },
        ],
        default: [
            {
                type: 'KAKAO',
                onSuccess: handleSuccessAuth,
                onError: handleErrorKakao,
            },
        ],
    });

    return <SignInTemplates logo={<SignInLogo />} buttons={buttons} />;
};

export default SignInPage;
