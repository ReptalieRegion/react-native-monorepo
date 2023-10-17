import React from 'react';
import { StyleSheet, View } from 'react-native';
import type { ColorValue } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { IconFunction } from '<Icon>';

type FloatingButtonState = {
    Icon: IconFunction;
    iconStyle?: {
        backgroundColor?: ColorValue;
        width: number;
        height: number;
        borderWidth?: number;
        borderColor?: ColorValue;
    };
};

interface FloatingButtonActions {
    onPress?(): void;
}

export type FloatingButtonProps = FloatingButtonState & FloatingButtonActions;

export default function FloatingButton({ onPress, Icon, iconStyle }: FloatingButtonProps) {
    const scale = useSharedValue(1);

    const scaleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const scaleDown = () => {
        scale.value = withTiming(0.85, { duration: 150, easing: Easing.bezier(0.4, 0, 0.2, 1) });
    };

    const scaleUp = () => {
        scale.value = withTiming(1, { duration: 150, easing: Easing.bezier(0.4, 0, 0.2, 1) });
    };

    return (
        <TouchableWithoutFeedback
            onPressIn={scaleDown}
            onPressOut={scaleUp}
            onPress={onPress}
            containerStyle={styles.container}
        >
            <Animated.View style={scaleStyle}>
                <View style={[iconStyle, styles.content]}>
                    <Icon />
                </View>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 9999,
    },
});
