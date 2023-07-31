import React, { ReactNode } from 'react';
import { Dimensions, TouchableWithoutFeedback, View } from 'react-native';
import { color } from '../tokens/colors';
import { UIPromptsDefaultProps } from '<UIPrompts>';

interface BackDropProps extends UIPromptsDefaultProps {
    backDropColor?: string;
    children: ReactNode;
}

const { width, height } = Dimensions.get('screen');

const BackDrop = ({ children, backDropColor = color.Black.alpha(0.5).toString(), uiPromptsClose }: BackDropProps) => {
    return (
        <TouchableWithoutFeedback onPress={uiPromptsClose}>
            <View style={{ width, height, backgroundColor: backDropColor }}>{children}</View>
        </TouchableWithoutFeedback>
    );
};

export default BackDrop;
