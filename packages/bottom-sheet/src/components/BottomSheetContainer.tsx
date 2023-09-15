import { color } from 'design-system';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, ViewStyle, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';

type BottomSheetContainerProps = {
    style?: ViewStyle;
};

const BottomSheetContainer = ({ children, style }: PropsWithChildren<BottomSheetContainerProps>) => {
    const dimensions = useWindowDimensions();
    const { height, translateY, insets } = useBottomSheetAnimatedState();
    const keyboard = useAnimatedKeyboard();

    const closeAnimatedStyles = useAnimatedStyle(() => {
        const subHeight =
            keyboard.state.value === 1 || keyboard.state.value === 2
                ? keyboard.height.value - (insets?.bottom ?? 0)
                : keyboard.height.value;
        return {
            transform: [{ translateY: translateY.value - subHeight }],
        };
    });

    const snapAnimatedStyles = useAnimatedStyle(() => {
        const maxHeight =
            keyboard.state.value === 1 || keyboard.state.value === 2
                ? Math.min(dimensions.height - (insets?.top ?? 0) - keyboard.height.value, height.value)
                : height.value;

        return {
            height: maxHeight,
        };
    });

    return (
        <Animated.View style={[styles.container, closeAnimatedStyles]}>
            <Animated.View style={[styles.viewContainer, { width: dimensions.width }, snapAnimatedStyles, style]}>
                {children}
            </Animated.View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: color.White.toString(),
    },
});

export default BottomSheetContainer;