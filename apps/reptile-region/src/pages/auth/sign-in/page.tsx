import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import { color } from '@/components/common/tokens/colors';

const SignInPage = () => {
    return (
        <View style={styles.container}>
            <View>
                <TextInput placeholder="아이디를 입력해주세요." />
            </View>
            <View>
                <TextInput placeholder="비밀번호를 입력해주세요." />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});

export default SignInPage;
