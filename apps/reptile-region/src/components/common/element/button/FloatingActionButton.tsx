import React from 'react';
import { ColorValue, DimensionValue, StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { IconFunction } from '<Icon>';

export type IconStyle = {
    backgroundColor?: ColorValue;
    width?: DimensionValue | undefined;
    height?: DimensionValue | undefined;
    borderWidth?: number;
    borderColor?: ColorValue;
};

type FloatingActionButtonProps = {
    onPress?: () => void;
    Icon: IconFunction;
    iconStyle?: IconStyle;
};

const FloatingActionButton = ({ onPress, Icon, iconStyle }: FloatingActionButtonProps) => {
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
};

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

export default FloatingActionButton;
