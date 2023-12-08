import { color } from '@reptile-region/design-system';
import React, { useMemo, type PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { KeyboardState, useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';

export type BottomSheetContainerProps = {
    style?: Pick<ViewStyle, 'borderTopRightRadius' | 'borderTopEndRadius' | 'borderTopLeftRadius' | 'borderTopStartRadius'>;
};

export default function BottomSheetContainer({ children, style }: PropsWithChildren<BottomSheetContainerProps>) {
    const dimensions = useWindowDimensions();
    const {
        snapInfo: { pointsFromTop },
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

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.viewContainer, snapAnimatedStyles, { paddingBottom: bottom }, style]}>
                {children}
            </Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    viewContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: color.White.toString(),
    },
});
