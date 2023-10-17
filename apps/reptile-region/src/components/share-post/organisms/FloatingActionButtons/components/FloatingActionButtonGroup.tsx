import React, { Children, isValidElement, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { TIMING_CONFIG } from '../constants/timing-config';
import useFloating from '../hooks/useFloating';

import type { FloatingButtonProps } from './FloatingButton';
import FloatingButton from './FloatingButton';

type FloatingButtonNameProps = { name: 'primary' | 'secondary' } & FloatingButtonProps;

type FloatingActionButtonGroupProps = {
    position: {
        bottom?: number;
        top?: number;
        left?: number;
        right?: number;
    };
    children: Array<React.ReactElement<FloatingButtonNameProps>> | React.ReactElement<FloatingButtonNameProps>;
};

export default function FloatingActionButtonGroup({ position, children }: FloatingActionButtonGroupProps) {
    const primaryHeight = useSharedValue(0);
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));
    const { startAnimation } = useFloating();

    const primaryChildren = Children.toArray(children)
        .filter(isValidElement)
        .map((i) => {
            const currentChildren = i as React.ReactElement<FloatingButtonNameProps>;

            switch (currentChildren.props.name) {
                case 'primary':
                    primaryHeight.value = currentChildren.props.iconStyle?.height ?? 0;
                    return (
                        <View style={styles.primaryContainer} key={'primary'}>
                            {currentChildren}
                        </View>
                    );
                case 'secondary':
                    return (
                        <Animated.View key={'secondary'} style={animatedStyle}>
                            {currentChildren}
                        </Animated.View>
                    );
                default:
                    return null;
            }
        });

    useEffect(() => {
        if (startAnimation) {
            translateY.value = withTiming(-(primaryHeight.value + 10), TIMING_CONFIG);
            opacity.value = withTiming(1, TIMING_CONFIG);
        } else {
            translateY.value = withTiming(0, TIMING_CONFIG);
            opacity.value = withTiming(0, TIMING_CONFIG);
        }
    }, [opacity, primaryHeight, startAnimation, translateY]);

    return <View style={[styles.container, { ...position }]}>{primaryChildren}</View>;
}

FloatingActionButtonGroup.Button = ({ Icon, iconStyle, onPress }: FloatingButtonNameProps) => (
    <FloatingButton Icon={Icon} iconStyle={iconStyle} onPress={onPress} />
);

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    primaryContainer: {
        zIndex: 1,
    },
});
