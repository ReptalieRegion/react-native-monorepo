import { color } from '@crawl/design-system';
import { useDebounceValue, useLoading } from '@crawl/react-hooks';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import SignUpTextField from '../@common/components/SignUpTextField';
import SignUpTitle from '../@common/components/SignUpTitle';
import useCreatePushAgree from '../@common/hooks/mutations/useCreatePushAgree';

import useAuthTokenAndPublicKey from '@/apis/auth/hooks/mutations/useAuthTokenAndPublicKey';
import useSignUpStep1 from '@/apis/auth/hooks/mutations/useSignUpStep1';
import useNicknameDuplicateCheck from '@/apis/auth/hooks/queries/useNicknameDuplicateCheck';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import PageWrapper from '@/components/PageWrapper';
import { useAuthHandler } from '@/hooks/auth';
import useKeyboardOpenButtonSize from '@/hooks/useKeyboardOpenButtonSize';
import type { SignUpStep1ScreenProps } from '@/types/routes/props/auth/sign-up';

export default function SignUpStep1({
    navigation,
    route: {
        params: {
            user: { recommendNickname, id: userId },
        },
    },
}: SignUpStep1ScreenProps) {
    const [nickname, setNickname] = useState(recommendNickname);
    const [errorMessage, setErrorMessage] = useState('');
    const { loading, startLoading, endLoading } = useLoading();
    const buttonSize = useKeyboardOpenButtonSize();
    const isFocused = useIsFocused();
    const { signIn } = useAuthHandler();
    const { bottom } = useSafeAreaInsets();
    const debouncedNickname = useDebounceValue(nickname, 500, endLoading);
    const { data, isLoading } = useNicknameDuplicateCheck({
        nickname: debouncedNickname,
        enabled: debouncedNickname !== recommendNickname && debouncedNickname !== '',
    });

    const { mutateAsync: authTokenAndPublicKeyMutateAsync } = useAuthTokenAndPublicKey();
    const { mutateAsync: signUpSte1MutateAsync } = useSignUpStep1();
    const { mutate: createPushAgreeMutate } = useCreatePushAgree();

    const disabled = nickname === '' || !!errorMessage;

    useEffect(() => {
        const isEmptyNickname = nickname === '';
        if (isEmptyNickname) {
            setErrorMessage('닉네임은 필수로 입력해주세요');
            return;
        }

        const isDuplicateNickname = data?.isDuplicate;
        if (isDuplicateNickname) {
            setErrorMessage('닉네임이 중복되었어요');
            return;
        }

        const isInvalidNickname = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]{1,10}$/.test(nickname);
        if (!isInvalidNickname) {
            setErrorMessage('닉네임은 한글, 영문, 숫자로 10자까지 가능합니다.');
            return;
        }

        setErrorMessage('');
    }, [data?.isDuplicate, nickname]);

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
            const tokens = await signUpSte1MutateAsync({
                authToken,
                joinProgress: 'REGISTER0',
                nickname,
                userId,
            });

            await signIn(tokens);
            createPushAgreeMutate();
            navigation.popToTop();
        } catch (error) {
            throw error;
        }
    };

    const { height, state } = useAnimatedKeyboard();

    const buttonAnimationIOS = useAnimatedStyle(() => {
        const isOpenState = state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING;
        return {
            transform: [{ translateY: isOpenState ? -height.value : -bottom }],
            paddingHorizontal: isOpenState ? 0 : 20,
        };
    }, [height.value, state.value, bottom]);

    const buttonAnimationAndroid = useAnimatedStyle(() => {
        const isOpenState = state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING;
        return {
            transform: [{ translateY: isOpenState ? -height.value - bottom : -Math.max(20, bottom * 2) }],
            paddingHorizontal: isOpenState ? 0 : 20,
        };
    }, [height.value, state.value, bottom]);

    const buttonAnimation = Platform.select({
        ios: buttonAnimationIOS,
        android: buttonAnimationAndroid,
    });

    return (
        <PageWrapper>
            <TouchableWithoutFeedback style={styles.wrapper} containerStyle={styles.wrapper} onPress={Keyboard.dismiss}>
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
                <Animated.View style={[styles.buttonContainer, buttonAnimation]}>
                    <ConfirmButton
                        text="다음"
                        variant={'confirm'}
                        size={buttonSize}
                        onPress={handleNextButton}
                        disabled={disabled}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
        </PageWrapper>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    contents: {
        marginTop: 40,
        paddingHorizontal: 20,
        gap: 40,
    },
    textFiledContainer: {
        height: 70,
        marginBottom: 10,
    },
    buttonContainer: {
        marginTop: 'auto',
    },
});
