import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import type { WithTimingConfig } from 'react-native-reanimated';

import useHeartAnimation from '../../hooks/useHeartAnimation';

import LikeIcon from '@/components/share-post/atoms/Like';

type InteractiveHeartState = {
    isLike: boolean | undefined;
};

interface InteractiveHeartActions {
    onPress(): void;
}

type InteractiveHeartProps = InteractiveHeartState & InteractiveHeartActions;

const TIMING_CONFIG: WithTimingConfig = { duration: 140 };

export default function InteractiveHeart({ isLike, onPress }: InteractiveHeartProps) {
    const { isStartHeartAnimation } = useHeartAnimation();
    const scale = useSharedValue(1);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    useEffect(() => {
        if (isStartHeartAnimation) {
            scale.value = withSequence(
                withTiming(0.7, TIMING_CONFIG),
                withTiming(1.3, TIMING_CONFIG),
                withTiming(1, TIMING_CONFIG),
            );
        }
    }, [scale, isStartHeartAnimation]);

    return (
        <TouchableOpacity onPress={onPress}>
            <Animated.View style={animatedStyle}>
                <LikeIcon isLike={isLike} />
            </Animated.View>
        </TouchableOpacity>
    );
}
