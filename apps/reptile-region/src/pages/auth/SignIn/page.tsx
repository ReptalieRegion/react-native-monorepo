import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import type { PostKakaoAuth, SignUpRegister0 } from '<api/auth>';
import type { RootRoutesParamList } from '<routes/root>';
import SignInLogo from '@/components/auth/atoms/SignInLogo/SignInLogo';
import SignInTemplates, { type SocialButtons } from '@/components/auth/templates/SignInTemplates';
import { useToast } from '@/overlay/Toast';

type SignInScreenProps = NativeStackScreenProps<RootRoutesParamList, 'sign-in'>;

const SignInPage = ({ navigation }: SignInScreenProps) => {
    const { openToast } = useToast();

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
    const handleSuccessKakao = (data: PostKakaoAuth['Response']) => {
        switch (data.type) {
            case 'SIGN_IN':
                return;
            case 'SIGN_UP':
                navigateSignUpPage({
                    joinProgress: data.joinProgress,
                    nickname: data.nickname ?? '테스트',
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
