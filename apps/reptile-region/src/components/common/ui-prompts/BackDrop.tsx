import React from 'react';
import { Dimensions, StyleSheet, View, ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import { color } from '@/components/common/tokens/colors';

export type BackDropStyle = Pick<ViewStyle, 'backgroundColor'>;

interface BackDropProps extends UIPromptsDefaultProps {
    backDropStyle?: BackDropStyle;
}

const { width, height } = Dimensions.get('window');

const BackDrop = ({ backDropStyle, uiPromptsClose }: BackDropProps) => {
    return (
        <TouchableWithoutFeedback onPress={uiPromptsClose}>
            <View style={[styles.container, backDropStyle]} />
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width,
        height,
        backgroundColor: color.Black.alpha(0.5).toString(),
    },
});

export default BackDrop;
