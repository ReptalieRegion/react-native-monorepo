import { color } from 'design-system';
import React, { PropsWithChildren } from 'react';
import { StyleSheet, useWindowDimensions } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import useBottomSheetAnimatedState from '../hooks/useBottomSheetAnimatedState';
import { ContainerStyle } from '../types/bottom-sheet';

type BottomSheetContainerProps = {
    style?: ContainerStyle;
};

const BottomSheetContainer = ({ children, style }: PropsWithChildren<BottomSheetContainerProps>) => {
    const { width } = useWindowDimensions();
    const { height, translateY } = useBottomSheetAnimatedState();
    const closeAnimatedStyles = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));
    const snapAnimatedStyles = useAnimatedStyle(() => ({
        height: height.value,
    }));

    console.log(height.value);

    return (
        <Animated.View style={[styles.container, closeAnimatedStyles]}>
            <Animated.View style={[styles.viewContainer, { width }, snapAnimatedStyles, style]}>{children}</Animated.View>
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
