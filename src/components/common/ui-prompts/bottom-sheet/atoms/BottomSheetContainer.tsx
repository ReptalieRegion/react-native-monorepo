import React, { PropsWithChildren } from 'react';
import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';

import BackDrop, { BackDropStyle } from '../../BackDrop';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import { color } from '@/components/common/tokens/colors';

type TranslateStyle = {
    transform: {
        translateY: number;
    }[];
};
type AnimatedStyle = Pick<ViewStyle, 'height'>;
export type ConTainerStyle = Pick<ViewStyle, 'backgroundColor' | 'borderRadius'>;

export type BottomSheetContainerProps = {
    closeAnimatedStyles?: TranslateStyle;
    snapAnimatedStyles?: AnimatedStyle;
    containerStyle?: ConTainerStyle;
    backDropStyle?: BackDropStyle;
};

const { width } = Dimensions.get('screen');

const BottomSheetContainer = ({
    children,
    containerStyle,
    backDropStyle,
    snapAnimatedStyles,
    closeAnimatedStyles,
    uiPromptsClose,
}: PropsWithChildren<BottomSheetContainerProps & UIPromptsDefaultProps>) => {
    return (
        <>
            <BackDrop uiPromptsClose={uiPromptsClose} backDropStyle={backDropStyle} />
            <Animated.View style={[styles.container, closeAnimatedStyles]}>
                <Animated.View style={[styles.viewContainer, containerStyle, snapAnimatedStyles]}>{children}</Animated.View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        width: width,
        position: 'absolute',
        bottom: 0,
        backgroundColor: color.White.toString(),
    },
});

export default BottomSheetContainer;
