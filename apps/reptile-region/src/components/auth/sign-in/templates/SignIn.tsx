import { color } from '@reptile-region/design-system';
import React from 'react';
import { Keyboard, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import KakaoButton from '@/components/@common/molecules/AuthButton/KakaoButton';
import LogoAndTextPage from '@/components/auth/sign-in/atoms/LogoAndText';

const SignIn = () => {
    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LogoAndTextPage />
                <KakaoButton
                    onSuccess={(profile) => {
                        console.log(profile);
                    }}
                    onError={(error) => {
                        console.log(error);
                    }}
                />
            </View>
        </TouchableNativeFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
        flexDirection: 'column',
        alignItems: 'center',
        gap: 15,
        paddingTop: 20,
    },
});

export default SignIn;
