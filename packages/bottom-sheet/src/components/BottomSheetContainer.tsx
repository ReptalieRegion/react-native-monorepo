import { color } from '@crawl/design-system';
import React, { useEffect, useMemo, type PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';

export type BottomSheetContainerProps = {
    style?: ViewStyle;
    border?: Pick<
        ViewStyle,
        | 'borderTopRightRadius'
        | 'borderTopEndRadius'
        | 'borderTopLeftRadius'
        | 'borderTopStartRadius'
        | 'borderBottomEndRadius'
        | 'borderBottomLeftRadius'
        | 'borderBottomRightRadius'
        | 'borderBottomStartRadius'
    >;
};

export default function BottomSheetContainer({
    children,
    style,
    border = { borderTopRightRadius: 16, borderTopEndRadius: 16, borderTopLeftRadius: 16, borderTopStartRadius: 16 },
}: PropsWithChildren<BottomSheetContainerProps>) {
    const dimensions = useWindowDimensions();
    const {
        snapInfo: { pointsFromTop, startIndex },
        height,
        translateY,
        opacity,
    } = useBottomSheetAnimatedState();
    const keyboard = useAnimatedKeyboard();
    const { top, bottom } = useSafeAreaInsets();

    const maxHeight = useMemo(() => dimensions.height - top, [dimensions.height, top]);

    const snapAnimatedStyles = useAnimatedStyle(() => {
        return {
            height: Math.max(height.value, Math.min(height.value + keyboard.height.value - bottom, maxHeight)),
            paddingBottom: Math.max(keyboard.height.value, bottom),
            transform: [{ translateY: translateY.value }],
        };
    }, [keyboard.state.value, keyboard.height.value, bottom, translateY.value]);

    const animatedStyle = useMemo(() => [styles.viewContainer, snapAnimatedStyles, border], [snapAnimatedStyles, border]);

    useEffect(() => {
        height.value = withTiming(pointsFromTop[startIndex], { duration: 250 });
        translateY.value = withTiming(0, { duration: 250 });
        opacity.value = withTiming(1, { duration: 250 });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <View style={style}>
            <Animated.View style={animatedStyle}>{children}</Animated.View>
        </View>
    );
}

const styles = StyleSheet.create({
    viewContainer: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        backgroundColor: color.White.toString(),
    },
});
