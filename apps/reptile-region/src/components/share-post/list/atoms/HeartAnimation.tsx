import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';

import { Like_55 as LikeIcon } from '../../../../assets/icons';
import useSharePostListStore from '../../../../stores/share-post/list';
import { color } from '../../../common/tokens/colors';

import { SharePostListData } from '<SharePostListAPI>';

type HeartAnimationProps = Pick<SharePostListData, 'postId'>;

type DotMapType = 'leftTop' | 'top' | 'rightTop' | 'right' | 'rightBottom' | 'bottom' | 'leftBottom' | 'left';

type DotTranslateMap = {
    [key in DotMapType]: {
        translateX: number;
        translateY: number;
    };
};

type DotStyles = {
    [key in DotMapType]: Pick<ViewStyle, 'top' | 'left'>;
};

const DOT_MAP: DotMapType[] = ['leftTop', 'top', 'rightTop', 'right', 'rightBottom', 'bottom', 'leftBottom', 'left'];
const ICON_SIZE = 55;
const DOT_SIZE = 10;
const HALF_DOT_SIZE = DOT_SIZE * 0.5;
const HALF_ICON_SIZE = ICON_SIZE * 0.5;
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

const Dot = ({ dotName }: { dotName: DotMapType }) => {
    const scale = useSharedValue(1);
    const translateX = useSharedValue(-HALF_DOT_SIZE);
    const translateY = useSharedValue(-HALF_DOT_SIZE);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
    }));

    useEffect(() => {
        scale.value = withTiming(0, { duration: 300 });
        const dotTranslateY = TRANSLATE_MAP[dotName].translateY;
        translateY.value = withTiming(dotTranslateY, { duration: 300 });
        translateX.value = withTiming(TRANSLATE_MAP[dotName].translateX, { duration: 300 });
    }, [dotName, scale, translateX, translateY]);

    return <Animated.View style={[styles.dot, dotStyles[dotName], animatedStyle]} />;
};

const HeartAnimation = ({ postId }: HeartAnimationProps) => {
    const setStartLikeAnimation = useSharePostListStore((state) => state.setStartLikeAnimation);
    const heartScale = useSharedValue(1.5);
    const animatedHeartStyle = useAnimatedStyle(() => ({
        transform: [{ scale: heartScale.value }],
    }));

    useEffect(() => {
        heartScale.value = withSequence(withTiming(2.1), withTiming(1.8, { duration: 140 }));
        setTimeout(() => setStartLikeAnimation(postId, false), 700);
    }, [heartScale, postId, setStartLikeAnimation]);

    return (
        <View style={styles.container}>
            {DOT_MAP.map((dotName) => (
                <Dot key={dotName} dotName={dotName} />
            ))}
            <Animated.View style={[styles.heart, animatedHeartStyle]}>
                <LikeIcon width={ICON_SIZE} height={ICON_SIZE} />
            </Animated.View>
        </View>
    );
};

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

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    center: {
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: [{ translateX: -HALF_ICON_SIZE }, { translateY: -HALF_ICON_SIZE }, { scale: 1.5 }],
    },
    dot: {
        position: 'absolute',
        width: 10,
        height: 10,
        borderRadius: 9999,
        backgroundColor: color.Red[500].toString(),
        transform: [{ translateX: -HALF_DOT_SIZE }],
    },
    heart: {
        width: ICON_SIZE,
        height: ICON_SIZE,
        transform: [{ translateX: -HALF_ICON_SIZE }, { translateY: -HALF_ICON_SIZE }],
    },
});

export default HeartAnimation;
