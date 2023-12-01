import { useIsFocused } from '@react-navigation/native';
import { color } from '@reptile-region/design-system';
import { useDebounce, useLoading } from '@reptile-region/react-hooks';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { SignUpStep1ScreenProps } from './type';

import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import useSignUpStep1 from '@/apis/auth/hooks/mutations/useSignUpStep1';
import useNicknameDuplicateCheck from '@/apis/auth/hooks/queries/useNicknameDuplicateCheck';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import { SignUpTextField, SignUpTitle } from '@/components/auth/molecules';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import useKeyboardOpenButtonSize from '@/hooks/@common/useKeyboardOpenButtonSize';

export default function SignUpStep1({
    navigation,
    route: {
        params: {
            user: { recommendNickname, id: userId },
        },
    },
}: SignUpStep1ScreenProps) {
    const [nickname, setNickname] = useState(recommendNickname);
    const { loading, startLoading, endLoading } = useLoading();
    const buttonSize = useKeyboardOpenButtonSize();
    const isFocused = useIsFocused();
    const { signIn } = useAuth();
    const { bottom } = useSafeAreaInsets();
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
        }
    };

    const { height, state } = useAnimatedKeyboard();

    const buttonAnimation = useAnimatedStyle(() => {
        const isOpenState = state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING;
        return {
            justifyContent: 'flex-end',
            paddingBottom: isOpenState ? height.value : bottom <= 20 ? 20 : bottom,
            paddingHorizontal: isOpenState ? 0 : 20,
        };
    }, [height.value, state.value, bottom]);

    return (
        <TouchableWithoutFeedback style={styles.wrapper} containerStyle={styles.wrapper} onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <View style={styles.contents}>
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
                            autoFocus={isFocused}
                        />
                    </View>
                </View>
                <Animated.View style={buttonAnimation}>
                    <ConfirmButton
                        text="다음"
                        variant={'confirm'}
                        size={buttonSize}
                        onPress={handleNextButton}
                        disabled={disabled}
                    />
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        paddingTop: 40,
    },
    contents: {
        paddingHorizontal: 20,
        flex: 1,
        gap: 40,
    },
    textFiledContainer: {
        height: 70,
        marginBottom: 10,
    },
});
