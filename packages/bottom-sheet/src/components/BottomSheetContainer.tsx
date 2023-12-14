import { color } from '@crawl/design-system';
import React, { useEffect, useMemo, type PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';

export type BottomSheetContainerProps = {
    style?: Pick<ViewStyle, 'borderTopRightRadius' | 'borderTopEndRadius' | 'borderTopLeftRadius' | 'borderTopStartRadius'>;
};

export default function BottomSheetContainer({ children, style }: PropsWithChildren<BottomSheetContainerProps>) {
    const dimensions = useWindowDimensions();
    const {
        snapInfo: { pointsFromTop, startIndex },
        height,
        translateY,
    } = useBottomSheetAnimatedState();
    const keyboard = useAnimatedKeyboard();
    const { bottom } = useSafeAreaInsets();

    const maxHeight = useMemo(() => dimensions.height - bottom, [dimensions.height, bottom]);

    const snapAnimatedStyles = useAnimatedStyle(() => {
        const isOpen = keyboard.state.value === KeyboardState.OPENING || keyboard.state.value === KeyboardState.OPEN;
        const isNotOverMaxHeight = maxHeight - keyboard.height.value >= height.value;

        const subHeight = isOpen ? keyboard.height.value - bottom : Math.max(keyboard.height.value - bottom, 0);
        const newHeight = isOpen
            ? pointsFromTop.length === 1
                ? height.value
                : pointsFromTop[pointsFromTop.length - 1] + bottom - keyboard.height.value
            : isNotOverMaxHeight
            ? height.value
            : Math.min(height.value, height.value - keyboard.height.value + bottom);

        return {
            height: newHeight,
            transform: [{ translateY: translateY.value - subHeight }],
        };
    }, [keyboard.state.value, keyboard.height.value, bottom, translateY.value]);

    const animatedStyle = useMemo(
        () => [styles.viewContainer, snapAnimatedStyles, { paddingBottom: bottom }, style],
        [bottom, snapAnimatedStyles, style],
    );

    useEffect(() => {
        height.value = withTiming(pointsFromTop[startIndex]);
        translateY.value = withTiming(0);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2,
    },
    viewContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: color.White.toString(),
    },
});
