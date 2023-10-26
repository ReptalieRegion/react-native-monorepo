import React from 'react';
import { Platform } from 'react-native';

import SignInLogo from '@/components/auth/atoms/SignInLogo/SignInLogo';
import SignInTemplates, { type SocialButtons } from '@/components/auth/templates/SignInTemplates';
import { useToast } from '@/overlay/Toast';

const SignInPage = () => {
    const { openToast } = useToast();

    const handleErrorToast = () => {
        openToast({
            severity: 'error',
            contents: '알 수 없는 에러가 발생했습니다.',
        });
    };

    const buttons: SocialButtons =
        Platform.OS === 'ios'
            ? [
                  {
                      type: 'KAKAO',
                      onSuccess: (profile) => {
                          console.log(profile);
                      },
                      onError: () => {
                          handleErrorToast();
                      },
                  },
                  {
                      type: 'APPLE',
                      onSuccess: () => {
                          console.log('apple');
                      },
                      onError: (error) => {
                          console.log(error);
                      },
                  },
              ]
            : [
                  {
                      type: 'KAKAO',
                      onSuccess: (profile) => {
                          console.log(profile);
                      },
                      onError: (error: unknown) => {
                          console.log(error);
                      },
                  },
                  {
                      type: 'GOOGLE',
                      onSuccess: () => {
                          console.log('GOOGLE');
                      },
                      onError: (error) => {
                          console.log(error);
                      },
                  },
              ];

    return <SignInTemplates logo={<SignInLogo />} buttons={buttons} />;
};

export default SignInPage;
