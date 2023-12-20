import { useCallback } from 'react';
import React, { TouchableWithoutFeedback, useWindowDimensions, type ViewStyle } from 'react-native';
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

    return (
        <TouchableWithoutFeedback onPress={close}>
            <Animated.View style={[{ width, height }, style, closeAnimatedStyle]} />
        </TouchableWithoutFeedback>
    );
}
