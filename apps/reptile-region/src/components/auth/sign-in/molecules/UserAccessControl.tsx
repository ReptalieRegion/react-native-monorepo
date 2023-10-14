import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { RootRoutesParamList } from '<routes/root>';
import { TextButton } from '@/components/@common/atoms';

const UserAccessControl = () => {
    const navigation = useNavigation<NavigationProp<RootRoutesParamList, 'sign-in'>>();
    const handleFindId = () => {
        return;
    };

    const handleFindPassword = () => {
        return;
    };

    const handleSignUp = () => {
        navigation.navigate('sign-up');
        return;
    };

    return (
        <View style={styles.textButtons}>
            <TextButton text="아이디 찾기" type="text" touchableProps={{ onPress: handleFindId }} />
            <TextButton text="비밀번호 찾기" type="text" touchableProps={{ onPress: handleFindPassword }} />
            <TextButton text="회원가입" type="text" touchableProps={{ onPress: handleSignUp }} />
        </View>
    );
};

const styles = StyleSheet.create({
    textButtons: {
        flexDirection: 'row',
    },
});

export default UserAccessControl;
