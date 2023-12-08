import React, { TouchableWithoutFeedback, useWindowDimensions } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import useBottomSheetAnimatedAction from '../hooks/useBottomSheetAnimatedAction';
import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';
import type { BackDropStyle } from '../types/bottom-sheet';

export type BackDropProps = {
    style?: BackDropStyle;
};

const BackDrop = ({ style }: BackDropProps) => {
    const { width, height } = useWindowDimensions();
    const { opacity } = useBottomSheetAnimatedState();
    const { bottomSheetClose } = useBottomSheetAnimatedAction();
    const { state } = useAnimatedKeyboard();

    const closeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    const close = () => {
        if (state.value === KeyboardState.UNKNOWN || state.value === KeyboardState.CLOSED) {
            bottomSheetClose();
        }
    };

    return (
        <TouchableWithoutFeedback onPress={close}>
            <Animated.View style={[{ width, height }, style, closeAnimatedStyle]} />
        </TouchableWithoutFeedback>
    );
};

export default BackDrop;
