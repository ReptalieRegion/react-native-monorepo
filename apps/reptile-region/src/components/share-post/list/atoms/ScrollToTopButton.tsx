import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import useScaleDownAndUp from '../animated/useScaleDownAndUp';

import { FloatingActionButtonSize } from '<SharePostComponent>';
import { UpArrow } from '@/assets/icons';
import { color } from '@/components/common/tokens/colors';
import { useFlatList } from '@/contexts/flat-list/FlatList';
import useLock from '@/hooks/useLock';

const ScrollToTopButton = ({ buttonSize }: FloatingActionButtonSize) => {
    const { verticalDirection, overScrollingState, scrollIntoView } = useFlatList();
    const { scaleStyle, scaleDown, scaleUp } = useScaleDownAndUp();
    const { isLock, lockEnd, lockStart } = useLock();
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const upAnimated = useCallback(() => {
        translateY.value = withTiming(-(buttonSize.height + 10), { duration: 300 });
        opacity.value = withTiming(1, { duration: 300 });
    }, [buttonSize.height, opacity, translateY]);

    const downAnimated = useCallback(() => {
        translateY.value = withTiming(0, { duration: 300 });
        opacity.value = withTiming(0, { duration: 300 });
    }, [opacity, translateY]);

    useEffect(() => {
        if (isLock() || overScrollingState === 'top') {
            return;
        }

        if (verticalDirection === 'top') {
            upAnimated();
            return;
        }

        if (verticalDirection === 'bottom') {
            downAnimated();
            return;
        }
    }, [isLock, upAnimated, downAnimated, verticalDirection, overScrollingState]);

    const handleIconClick = () => {
        lockStart();
        scrollIntoView({ offset: 0 });
        downAnimated();
        setTimeout(lockEnd, 500);
    };

    return (
        <View style={styles.container}>
            <Animated.View style={[styles.container, animatedContainerStyle]}>
                <TouchableWithoutFeedback onPressIn={scaleDown} onPressOut={scaleUp} onPress={handleIconClick}>
                    <Animated.View style={[buttonSize, styles.content, scaleStyle]}>
                        <UpArrow />
                    </Animated.View>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
    content: {
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: color.Gray[200].toString(),
        backgroundColor: color.White.toString(),
        borderRadius: 9999,
    },
});

export default ScrollToTopButton;
