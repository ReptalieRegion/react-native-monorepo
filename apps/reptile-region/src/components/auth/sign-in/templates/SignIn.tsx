import { color } from 'design-system';
import React from 'react';
import { Keyboard, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import LogoAndTextPage from '@/components/auth/sign-in/atoms/LogoAndText';
import TextInputFields from '@/components/auth/sign-in/molecules/TextInputFields';
import UserAccessControl from '@/components/auth/sign-in/molecules/UserAccessControl';

const SignIn = () => {
    return (
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <LogoAndTextPage />
                <TextInputFields />
                <UserAccessControl />
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
