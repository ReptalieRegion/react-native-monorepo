import { color } from '@crawl/design-system';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Title from './Title';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';

type SignUpContainerState = {
    title: string;
    description?: string;
    button: {
        label: string;
        disabled: boolean;
        onPress: () => void;
    };
};

interface SignUpContainerActions {}

type SignUpContainerProps = SignUpContainerState & SignUpContainerActions;

export default function SignUpTextFieldContainer({ title, description, button }: SignUpContainerProps) {
    const { bottom } = useSafeAreaInsets();
    const { state, height } = useAnimatedKeyboard();

    const buttonAnimationIOS = useAnimatedStyle(() => {
        const isOpenState = state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING;
        return {
            transform: [{ translateY: isOpenState ? -height.value : -bottom }],
        };
    }, [height.value, state.value, bottom]);

    const buttonAnimationAndroid = useAnimatedStyle(() => {
        const isOpenState = state.value === KeyboardState.OPEN || state.value === KeyboardState.OPENING;
        return {
            transform: [{ translateY: isOpenState ? -height.value - bottom : -Math.max(20, bottom * 2) }],
        };
    }, [height.value, state.value, bottom]);

    const buttonAnimation = Platform.select({
        ios: buttonAnimationIOS,
        android: buttonAnimationAndroid,
    });

    return (
        <View style={styles.wrapper}>
            <Title title={title} description={description} />
            <Animated.View style={[styles.buttonWrapper, buttonAnimation]}>
                <ConfirmButton
                    text={button.label}
                    variant={'confirm'}
                    size={'full'}
                    onPress={button.onPress}
                    disabled={button.disabled}
                />
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    titleWrapper: {
        gap: 8,
    },
    buttonWrapper: {
        marginTop: 'auto',
    },
});
