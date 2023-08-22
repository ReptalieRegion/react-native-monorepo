import React from 'react';
import { StyleSheet, View } from 'react-native';

import TextButton from '@/components/common/layouts/button/TextButton';
import { color } from '@/components/common/tokens/colors';

const UserAccessControl = () => {
    const handleFindId = () => {
        return;
    };

    const handleFindPassword = () => {
        return;
    };

    const handleSignUp = () => {
        return;
    };

    return (
        <View style={styles.textButtons}>
            <TextButton text="아이디 찾기" textStyle={styles.textButtonsText} onPress={handleFindId} />
            <TextButton text="비밀번호 찾기" textStyle={styles.textButtonsText} onPress={handleFindPassword} />
            <TextButton text="회원가입" textStyle={styles.textButtonsText} onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    textButtons: {
        flexDirection: 'row',
        gap: 10,
    },
    textButtonsText: {
        fontSize: 12,
        lineHeight: 20,
        color: color.Gray[600].toString(),
    },
});

export default UserAccessControl;
