import React from 'react';
import { useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import useBottomSheetAnimatedAction from '../hooks/useBottomSheetAnimatedAction';
import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';
import { BackDropStyle } from '../types/bottom-sheet';

export type BackDropProps = {
    style?: BackDropStyle;
};

const BackDrop = ({ style }: BackDropProps) => {
    const { width, height } = useWindowDimensions();
    const { opacity } = useBottomSheetAnimatedState();
    const { bottomSheetClose } = useBottomSheetAnimatedAction();

    const closeAnimatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
    }));

    return (
        <TouchableWithoutFeedback onPress={bottomSheetClose}>
            <Animated.View style={[{ width, height }, style, closeAnimatedStyle]} />
        </TouchableWithoutFeedback>
    );
};

export default BackDrop;
