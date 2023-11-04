import { color } from '@reptile-region/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import type { AppleButtonProps } from '../organisms/AuthButton/AppleButton';
import AppleButton from '../organisms/AuthButton/AppleButton';
import type { GoogleButtonProps } from '../organisms/AuthButton/GoogleButton';
import GoogleButton from '../organisms/AuthButton/GoogleButton';
import type { KakaoButtonProps } from '../organisms/AuthButton/KakaoButton';
import KakaoButton from '../organisms/AuthButton/KakaoButton';

interface KaKao extends KakaoButtonProps {
    type: 'KAKAO';
}

interface Apple extends AppleButtonProps {
    type: 'APPLE';
}

interface Google extends GoogleButtonProps {
    type: 'GOOGLE';
}

export type SocialButtons = Array<KaKao | Apple | Google>;

type SignInTemplatesProps = {
    logo: ReactNode;
    buttons: SocialButtons;
};

export default function SignInTemplates({ logo, buttons }: SignInTemplatesProps) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>{logo}</View>
            <View style={styles.loginContainer}>
                {buttons.map((button) => {
                    const key = button.type;
                    switch (button.type) {
                        case 'KAKAO':
                            return (
                                <KakaoButton
                                    key={key}
                                    height={button.height}
                                    width={button.width}
                                    onSuccess={button.onSuccess}
                                    onError={button.onError}
                                />
                            );
                        case 'APPLE':
                            return (
                                <AppleButton
                                    key={key}
                                    height={button.height}
                                    width={button.width}
                                    onSuccess={button.onSuccess}
                                    onError={button.onError}
                                />
                            );
                        case 'GOOGLE':
                            return <GoogleButton key={key} onError={button.onError} onSuccess={button.onSuccess} />;
                    }
                })}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    loginContainer: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
        height: '50%',
    },
});