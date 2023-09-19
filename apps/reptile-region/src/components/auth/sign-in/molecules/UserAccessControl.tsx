import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MyNavigationProp } from '<MyRoutes>';
import TextButton from '@/components/common/layouts/button/TextButton';

const UserAccessControl = () => {
    const navigation = useNavigation<MyNavigationProp<'auth/sign-in'>>();
    const handleFindId = () => {
        return;
    };

    const handleFindPassword = () => {
        return;
    };

    const handleSignUp = () => {
        navigation.navigate('auth/sign-up');
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
