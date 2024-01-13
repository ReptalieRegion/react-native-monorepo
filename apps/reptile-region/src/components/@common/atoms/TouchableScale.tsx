import { color } from '@crawl/design-system';
import React, { useState, type PropsWithChildren } from 'react';
import { StyleSheet, type ViewStyle } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { Easing, ReduceMotion, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type TouchableScaleState = {
    containerStyle?: Pick<
        ViewStyle,
        | 'padding'
        | 'paddingBottom'
        | 'paddingEnd'
        | 'paddingHorizontal'
        | 'paddingLeft'
        | 'paddingRight'
        | 'paddingVertical'
        | 'paddingStart'
        | 'paddingTop'
    >;
};

interface TouchableScaleActions {
    onPress?(): void;
}

type TouchableScaleProps = TouchableScaleState & TouchableScaleActions;

const userConfig = {
    duration: 100,
    easing: Easing.inOut(Easing.quad),
    reduceMotion: ReduceMotion.System,
};

const White = color.White.toString();
const Gray500 = color.Gray[200].toString();

export default function TouchableScale({ onPress, children, containerStyle }: PropsWithChildren<TouchableScaleProps>) {
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    const [backgroundColor, setBackgroundColor] = useState(White);

    const scaleDown = () => {
        scaleX.value = withTiming(0.95, userConfig);
        scaleY.value = withTiming(0.95, userConfig);
        setBackgroundColor(Gray500);
    };

    const scaleReset = () => {
        scaleX.value = withTiming(1, userConfig);
        scaleY.value = withTiming(1, userConfig);
        setBackgroundColor(White);
    };

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor,
        transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
    }));

    return (
        <TouchableWithoutFeedback onPressIn={scaleDown} onPressOut={scaleReset} onPress={onPress}>
            <Animated.View style={[animatedStyle, styles.itemContainer, containerStyle]}>{children}</Animated.View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        borderRadius: 20,
    },
});
