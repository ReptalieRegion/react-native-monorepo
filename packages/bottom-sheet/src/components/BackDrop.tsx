import { useCallback, useMemo } from 'react';
import React, { StyleSheet, TouchableWithoutFeedback, useWindowDimensions, type ViewStyle } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import useBottomSheetAnimatedAction from '../hooks/useBottomSheetAnimatedAction';
import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';

export type BackDropProps = {
    style?: Pick<ViewStyle, 'backgroundColor'>;
};

export default function BackDrop({ style }: BackDropProps) {
    const { width, height } = useWindowDimensions();
    const { opacity } = useBottomSheetAnimatedState();
    const { bottomSheetClose } = useBottomSheetAnimatedAction();
    const { state } = useAnimatedKeyboard();

    const closeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const close = useCallback(() => {
        if (state.value === KeyboardState.UNKNOWN || state.value === KeyboardState.CLOSED) {
            bottomSheetClose();
        }
    }, [bottomSheetClose, state.value]);

    const wrapperStyle = useMemo(
        () => [{ width, height }, style, closeAnimatedStyle, styles.wrapper],
        [closeAnimatedStyle, height, style, width],
    );

    return (
        <TouchableWithoutFeedback onPress={close}>
            <Animated.View style={wrapperStyle} />
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'absolute',
    },
});
