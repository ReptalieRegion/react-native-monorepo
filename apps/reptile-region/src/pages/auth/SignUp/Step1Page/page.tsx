import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { color } from '@reptile-region/design-system';
import { useDebounce, useLoading } from '@reptile-region/react-hooks';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { SignUpParamList } from '<routes/sign-up>';
import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import useSignUpStep1 from '@/apis/auth/hooks/mutations/useSignUpStep1';
import useNicknameDuplicateCheck from '@/apis/auth/hooks/queries/useNicknameDuplicateCheck';
import { TextButton } from '@/components/@common/atoms';
import { SignUpTextField, SignUpTitle } from '@/components/auth/molecules';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';

type SignUpStep1ScreenProps = NativeStackScreenProps<SignUpParamList, 'step1'>;

export default function SignUpStep1({
    navigation,
    route: {
        params: { recommendNickname, userId },
    },
}: SignUpStep1ScreenProps) {
    const [nickname, setNickname] = useState(recommendNickname);
    const { loading, startLoading, endLoading } = useLoading();
    const { signIn } = useAuth();
    const debouncedNickname = useDebounce(nickname, 500, endLoading);
    const { data, isLoading } = useNicknameDuplicateCheck({
        nickname: debouncedNickname,
        enabled: debouncedNickname !== recommendNickname && debouncedNickname !== '',
    });

    const { mutateAsync: authTokenAndPublicKeyMutateAsync } = useAuthTokenAndPublicKey();
    const { mutateAsync: signUpSte1MutateAsync } = useSignUpStep1();

    const errorMessage = nickname === '' ? '닉네임은 필수로 입력해주세요.' : data?.isDuplicate ? '닉네임이 중복되었어요.' : '';
    const disabled = nickname === '' || !!errorMessage;

    const handleChangeText = (text: string) => {
        startLoading();
        setNickname(text);
    };

    const handlePressCancel = () => {
        setNickname('');
    };

    const handleNextButton = async () => {
        try {
            const { authToken } = await authTokenAndPublicKeyMutateAsync();
            const { accessToken, refreshToken } = await signUpSte1MutateAsync({
                authToken,
                joinProgress: 'REGISTER0',
                nickname,
                userId,
            });

            await signIn({ accessToken, refreshToken });
            navigation.popToTop();
        } catch (error) {
            throw error;
        } finally {
            console.log('hi');
        }
    };

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
                        value={nickname}
                        errorMessage={errorMessage}
                        isLoading={isLoading || loading}
                        onChangeText={handleChangeText}
                        onPressCancel={handlePressCancel}
                    />
                </View>
                <TextButton
                    text="다음"
                    type="view"
                    border="OVAL"
                    color="surface"
                    onPress={handleNextButton}
                    disabled={disabled}
                />
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
        height: 70,
        marginBottom: 10,
    },
});
