import { color } from '@crawl/design-system';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import useHeartAnimation from '../../hooks/useHeartAnimation';
import usePostCardHandler from '../../hooks/usePostCardHandler';

import type { DotMapType, DotStyles, DotTranslateMap } from './type';

import { DotIndicator, Like_55 as LikeIcon } from '@/assets/icons';
import { ConditionalRenderer } from '@/components/@common/atoms';

const DOT_MAP: DotMapType[] = ['leftTop', 'top', 'rightTop', 'right', 'rightBottom', 'bottom', 'leftBottom', 'left'];
const ICON_SIZE = 55;
const DOT_SIZE = 10;
const HALF_DOT_SIZE = DOT_SIZE * 0.5;
const HALF_ICON_SIZE = ICON_SIZE * 0.5;

function Dot({ dotName }: { dotName: DotMapType }) {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(-HALF_DOT_SIZE);
    const translateY = useSharedValue(-HALF_DOT_SIZE);

    const positionStyle = dotStyles[dotName];
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    }));

    useEffect(() => {
        scale.value = withTiming(0, { duration: 300 });
        const dotTranslateY = TRANSLATE_MAP[dotName].translateY;
        translateY.value = withTiming(dotTranslateY, { duration: 300 });
        translateX.value = withTiming(TRANSLATE_MAP[dotName].translateX, { duration: 300 });
    }, [dotName, scale, translateX, translateY]);

    return (
        <Animated.View style={[styles.dot, positionStyle, animatedStyle]}>
            <DotIndicator fill={color.Red[500].toString()} />
        </Animated.View>
    );
}

export default function ImageHeart() {
    const { isStartHeartAnimation } = useHeartAnimation();
    const { stopHeartAnimation } = usePostCardHandler();
    const heartScale = useSharedValue(1.5);

    const heartAnimatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: heartScale.value }],
    }));

    useEffect(() => {
        if (isStartHeartAnimation) {
            heartScale.value = withSequence(
                withTiming(2.1),
                withTiming(1.8, { duration: 140 }),
                withTiming(1.8, { duration: 500 }, (finished) => finished && runOnJS(stopHeartAnimation)()),
            );
        }
    }, [heartScale, isStartHeartAnimation, stopHeartAnimation]);

    return (
        <ConditionalRenderer
            condition={isStartHeartAnimation}
            trueContent={
                <View style={styles.container}>
                    {DOT_MAP.map((dotName, index) => {
                        const key = index.toString();

                        return <Dot key={key} dotName={dotName} />;
                    })}
                    <Animated.View style={[styles.heart, heartAnimatedStyle]}>
                        <LikeIcon width={ICON_SIZE} height={ICON_SIZE} />
                    </Animated.View>
                </View>
            }
            falseContent={null}
        />
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
    },
    dot: {
        position: 'absolute',
        transform: [{ translateX: -HALF_DOT_SIZE }],
    },
    heart: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        transform: [{ translateX: -HALF_ICON_SIZE }, { translateY: -HALF_ICON_SIZE }],
    },
});

const dotStyles: DotStyles = {
    leftTop: {
        left: '35%',
        top: '30%',
    },
    top: {
        left: '50%',
        top: '25%',
    },
    rightTop: {
        left: '65%',
        top: '30%',
    },
    right: {
        left: '70%',
        top: '44%',
    },
    rightBottom: {
        left: '65%',
        top: '60%',
    },
    bottom: {
        left: '50%',
        top: '70%',
    },
    leftBottom: {
        left: '35%',
        top: '60%',
    },
    left: {
        left: '30%',
        top: '44%',
    },
};

const TRANSLATE_MAP: DotTranslateMap = {
    leftTop: {
        translateX: -DOT_SIZE,
        translateY: -DOT_SIZE,
    },
    top: {
        translateX: -HALF_DOT_SIZE,
        translateY: -DOT_SIZE,
    },
    rightTop: {
        translateX: 0,
        translateY: -DOT_SIZE,
    },
    right: {
        translateX: 0,
        translateY: -HALF_DOT_SIZE,
    },
    rightBottom: {
        translateX: 0,
        translateY: 0,
    },
    bottom: {
        translateX: -HALF_DOT_SIZE,
        translateY: 0,
    },
    leftBottom: {
        translateX: -DOT_SIZE,
        translateY: 0,
    },
    left: {
        translateX: -DOT_SIZE,
        translateY: -HALF_DOT_SIZE,
    },
};
