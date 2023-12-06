import { color } from '@reptile-region/design-system';
import type { PropsWithChildren } from 'react';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';

import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';

type BottomSheetContainerProps = {
    style?: ViewStyle;
};

const BottomSheetContainer = ({ children, style }: PropsWithChildren<BottomSheetContainerProps>) => {
    const dimensions = useWindowDimensions();
    const {
        snapInfo: { pointsFromTop },
        height,
        translateY,
        insets,
    } = useBottomSheetAnimatedState();
    const keyboard = useAnimatedKeyboard();

    const snapAnimatedStyles = useAnimatedStyle(() => {
        const subHeight =
            keyboard.state.value === KeyboardState.OPENING || keyboard.state.value === KeyboardState.OPEN
                ? keyboard.height.value - (insets?.bottom ?? 0)
                : keyboard.height.value;

        const maxHeight =
            keyboard.state.value === KeyboardState.OPENING || keyboard.state.value === KeyboardState.OPEN
                ? pointsFromTop.length === 1
                    ? height.value
                    : pointsFromTop[pointsFromTop.length - 1] + (insets?.bottom ?? 0) - keyboard.height.value
                : keyboard.state.value === KeyboardState.CLOSING
                ? height.value - keyboard.height.value
                : height.value;

        console.log(maxHeight, translateY.value - subHeight);
        return {
            height: maxHeight,
            transform: [{ translateY: translateY.value - subHeight }],
        };
    }, [keyboard.state.value, keyboard.height.value, insets?.bottom, translateY.value]);

    return (
        <Animated.View style={[styles.container]}>
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
