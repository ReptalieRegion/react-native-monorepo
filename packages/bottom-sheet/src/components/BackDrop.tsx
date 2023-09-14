import React from 'react';
import { View, useWindowDimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import useBottomSheetAnimatedAction from '../hooks/useBottomSheetAnimatedAction';
import { BackDropStyle } from '../types/bottom-sheet';

export type BackDropProps = {
    style?: BackDropStyle;
};

const BackDrop = ({ style }: BackDropProps) => {
    const { width, height } = useWindowDimensions();
    const { bottomSheetClose } = useBottomSheetAnimatedAction();

    return (
        <TouchableWithoutFeedback onPress={bottomSheetClose}>
            <View style={[{ width, height }, style]} />
        </TouchableWithoutFeedback>
    );
};

export default BackDrop;
