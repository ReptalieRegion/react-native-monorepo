import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import type { JoinProgress, PostKakaoAuth } from '<api/auth>';
import type { RootRoutesParamList } from '<routes/root>';
import SignInLogo from '@/components/auth/atoms/SignInLogo/SignInLogo';
import SignInTemplates, { type SocialButtons } from '@/components/auth/templates/SignInTemplates';
import { useToast } from '@/overlay/Toast';

type SignInScreenProps = NativeStackScreenProps<RootRoutesParamList, 'sign-in'>;

const SignInPage = ({ navigation }: SignInScreenProps) => {
    const { openToast } = useToast();

    const navigateSignUpPage = (joinProgress: JoinProgress) => {
        switch (joinProgress) {
            case 'REGISTER0':
                navigation.navigate('sign-up', { screen: 'step1' });
                return;
            case 'DONE':
                navigation.navigate('bottom-tab/routes', {
                    screen: 'tab',
                    params: {
                        screen: 'home/routes',
                        params: {
                            screen: 'home/list',
                        },
                    },
                });
                return;
        }
    };

    const handleErrorToast = () => {
        openToast({ severity: 'error', contents: '알 수 없는 에러가 발생했습니다.' });
    };

    /** 카카로 로그인 시작 */
    const handleSuccessKakao = (data: PostKakaoAuth['Response']) => {
        if (data.type === 'SIGN_IN') {
            return;
        }

        if (data.type === 'SIGN_UP') {
            navigateSignUpPage(data.joinProgress);
            return;
        }
    };
    const handleErrorKakao = () => {
        handleErrorToast();
    };
    /** 카카로 로그인 끝 */

    /** 구글 로그인 시작 */
    const handleSuccessGoogle = () => {};
    const handleErrorGoogle = () => {};
    /** 구글 로그인 끝 */

    /** 애플 로그인 시작 */
    const handleSuccessApple = () => {};
    const handleErrorApple = () => {};
    /** 애플 로그인 끝 */

    const buttons: SocialButtons =
        Platform.OS === 'ios'
            ? [
                  {
                      type: 'KAKAO',
                      onSuccess: handleSuccessKakao,
                      onError: handleErrorKakao,
                  },
                  {
                      type: 'APPLE',
                      onSuccess: handleSuccessApple,
                      onError: handleErrorApple,
                  },
              ]
            : [
                  {
                      type: 'KAKAO',
                      onSuccess: handleSuccessKakao,
                      onError: handleErrorKakao,
                  },
                  {
                      type: 'GOOGLE',
                      onSuccess: handleSuccessGoogle,
                      onError: handleErrorGoogle,
                  },
              ];

    return <SignInTemplates logo={<SignInLogo />} buttons={buttons} />;
};

export default SignInPage;
