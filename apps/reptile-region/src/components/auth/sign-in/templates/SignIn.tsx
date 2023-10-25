import { color } from '@reptile-region/design-system';
import React from 'react';
import { Keyboard, Platform, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { AppleButton, KakaoButton } from '@/components/@common/molecules/AuthButton';
import GoogleButton from '@/components/@common/molecules/AuthButton/GoogleButton';
import LogoAndTextPage from '@/components/auth/sign-in/atoms/LogoAndText';

const SignIn = () => {
    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <LogoAndTextPage />
                </View>
                <View style={styles.loginContainer}>
                    <KakaoButton
                        onSuccess={(profile) => {
                            console.log(profile);
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                    />
                    {Platform.OS === 'ios' ? (
                        <AppleButton onSuccess={() => {}} onError={() => {}} />
                    ) : Platform.OS === 'android' ? (
                        <GoogleButton onSuccess={() => {}} onError={() => {}} />
                    ) : null}
                </View>
            </View>
        </TouchableNativeFeedback>
    );
};

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

export default SignIn;
