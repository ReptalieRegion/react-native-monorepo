import { color } from '@crawl/design-system';
import React, { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import type { AppleButtonProps } from './AuthButton/AppleButton';
import AppleButton from './AuthButton/AppleButton';
import type { GoogleButtonProps } from './AuthButton/GoogleButton';
import GoogleButton from './AuthButton/GoogleButton';
import type { KakaoButtonProps } from './AuthButton/KakaoButton';
import KakaoButton from './AuthButton/KakaoButton';

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
            <View style={styles.logoWrapper}>{logo}</View>
            <View style={styles.buttonWrapper}>
                {buttons.map((button) => {
                    const key = button.type;
                    switch (button.type) {
                        case 'KAKAO':
                            return (
                                <KakaoButton key={key} height={button.height} width={button.width} onError={button.onError} />
                            );
                        case 'APPLE':
                            return (
                                <AppleButton key={key} height={button.height} width={button.width} onError={button.onError} />
                            );
                        case 'GOOGLE':
                            return <GoogleButton key={key} onError={button.onError} />;
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
    logoWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    buttonWrapper: {
        width: '100%',
        alignItems: 'center',
        gap: 15,
        height: '50%',
    },
});
