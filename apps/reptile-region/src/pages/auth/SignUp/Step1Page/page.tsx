import { color } from '@reptile-region/design-system';
import React from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { TextButton } from '@/components/@common/atoms';
import { SignUpTextField, SignUpTitle } from '@/components/auth/molecules';

export default function SignUpStep1() {
    return (
        <TouchableWithoutFeedback style={styles.wrapper} containerStyle={styles.wrapper} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <SignUpTitle
                    title="닉네임 만들기"
                    description="닉네임을 추가해주세요. 한 번 설정한 닉네임은 변경이 불가 합니다."
                />
                <View style={styles.textFiledContainer}>
                    <SignUpTextField
                        label="닉네임"
                        onChangeText={(text) => {
                            console.log(text);
                        }}
                        isLoading={false}
                    />
                </View>
                <TextButton text="다음" type="view" border="OVAL" textInfo={{ textAlign: 'center', color: 'surface' }} />
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    container: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: color.White.toString(),
        gap: 20,
    },
    textFiledContainer: {
        marginBottom: 20,
    },
});
