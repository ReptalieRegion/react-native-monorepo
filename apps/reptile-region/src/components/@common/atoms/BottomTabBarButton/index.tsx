import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import type { WithTimingConfig } from 'react-native-reanimated';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import type { IconFunction } from '<Icon>';

type BottomTabBarButtonState = {
    isFocused: boolean;
    name: string;
};

interface BottomTabBarButtonActions {
    onPress(): void;
    onLongPress(): void;
    Icon: IconFunction;
}

type BottomTabBarButtonProps = BottomTabBarButtonState & BottomTabBarButtonActions;

const userConfig: WithTimingConfig = {
    duration: 200,
};

export default function BottomTabBarButton({ isFocused, name, onPress, onLongPress, Icon }: BottomTabBarButtonProps) {
    const scaleX = useSharedValue(1);
    const scaleY = useSharedValue(1);
    const scale = useSharedValue(1);
    const translateY = useSharedValue(0);

    const iconAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scaleX: scaleX.value }, { scaleY: scaleY.value }],
    }));

    const textAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }, { translateY: translateY.value }],
    }));

    const handlePressInIcon = () => {
        scaleX.value = withTiming(0.9, userConfig);
        scaleY.value = withTiming(0.9, userConfig);
        scale.value = withTiming(0.9, userConfig);
        translateY.value = withTiming(-2, userConfig);
    };

    const handlePressOutIcon = () => {
        scaleX.value = withSequence(
            withTiming(1.2, userConfig),
            withTiming(1.1, userConfig),
            withTiming(1.15, userConfig),
            withTiming(1.0, userConfig),
        );
        scaleY.value = withSequence(withTiming(1.15, userConfig), withTiming(1.0, userConfig));
        scale.value = withTiming(1, userConfig);
        translateY.value = withTiming(0, userConfig);
    };

    return (
        <View style={styles.iconContainer}>
            <TouchableWithoutFeedback
                onPress={onPress}
                onLongPress={onLongPress}
                onPressIn={handlePressInIcon}
                onPressOut={handlePressOutIcon}
                containerStyle={styles.touchContainer}
            >
                <View style={styles.icon}>
                    <Animated.View style={iconAnimatedStyle}>
                        <Icon fill={isFocused ? color.Green[700].toString() : undefined} />
                    </Animated.View>
                    <Animated.View style={textAnimatedStyle}>
                        <View style={styles.textContainer}>
                            <Typo variant="body5">{name}</Typo>
                        </View>
                    </Animated.View>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '20%',
    },
    touchContainer: {
        width: '100%',
    },
    icon: {
        width: '100%',
        paddingTop: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        marginTop: 4,
    },
});
