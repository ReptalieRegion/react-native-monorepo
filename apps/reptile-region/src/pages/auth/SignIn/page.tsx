import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { Platform } from 'react-native';

import type { RootRoutesParamList } from '<routes/root>';
import SignInLogo from '@/components/auth/atoms/SignInLogo/SignInLogo';
import SignInTemplates, { type SocialButtons } from '@/components/auth/templates/SignInTemplates';
import { useToast } from '@/overlay/Toast';

type SignInScreenProps = NativeStackScreenProps<RootRoutesParamList, 'sign-in'>;

const SignInPage = ({ navigation }: SignInScreenProps) => {
    const { openToast } = useToast();

    const navigateSignUpPage = () => {
        navigation.navigate('sign-up', { screen: 'step1' });
    };

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
                          navigateSignUpPage();
                      },
                      onError: () => {
                          handleErrorToast();
                      },
                  },
                  {
                      type: 'APPLE',
                      onSuccess: () => {
                          console.log('apple');
                          navigateSignUpPage();
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
                          navigateSignUpPage();
                      },
                      onError: (error: unknown) => {
                          console.log(error);
                      },
                  },
                  {
                      type: 'GOOGLE',
                      onSuccess: () => {
                          console.log('GOOGLE');
                          navigateSignUpPage();
                      },
                      onError: (error) => {
                          console.log(error);
                      },
                  },
              ];

    return <SignInTemplates logo={<SignInLogo />} buttons={buttons} />;
};

export default SignInPage;
