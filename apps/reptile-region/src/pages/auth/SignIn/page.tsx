import React from 'react';
import { Platform } from 'react-native';

import SignInLogo from './components/SignInLogo';
import SignInTemplates, { type SocialButtons } from './components/SignInTemplates';

import useToast from '@/components/overlay/Toast/useToast';

const SignInPage = () => {
    const openToast = useToast();

    const handleError = () => {
        openToast({ severity: 'error', contents: '알 수 없는 에러가 발생했습니다.' });
    };

    const buttons: SocialButtons = Platform.select({
        ios: [
            {
                type: 'KAKAO',
                onError: handleError,
            },
            {
                type: 'APPLE',
                onError: handleError,
            },
        ],
        android: [
            {
                type: 'KAKAO',
                onError: handleError,
            },
            {
                type: 'GOOGLE',
                onError: handleError,
            },
        ],
        default: [
            {
                type: 'KAKAO',
                onError: handleError,
            },
        ],
    });

    return <SignInTemplates logo={<SignInLogo />} buttons={buttons} />;
};

export default SignInPage;
