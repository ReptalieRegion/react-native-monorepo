import React, { useCallback, useContext, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import UpArrow from '@/assets/icons/UpArrow';
import { color } from '@/components/common/tokens/colors';
import { ScrollContext } from '@/contexts/scroll/ScrollContext';
import useScaleDownAndUp from '../animated/useScaleDownAndUp';
import { FloatingActionButtonSize } from '<SharePostComponent>';
import useLock from '@/hooks/useLock';

const ScrollToTopButton = ({ buttonSize }: FloatingActionButtonSize) => {
    const { scrollDirection, scrollIntoView } = useContext(ScrollContext);
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
        if (isLock()) {
            return;
        }

        if (scrollDirection === 'UP') {
            upAnimated();
            return;
        }

        if (scrollDirection === 'DOWN') {
            downAnimated();
            return;
        }
    }, [upAnimated, downAnimated, isLock, scrollDirection]);

    const handleIconClick = () => {
        lockStart();
        scrollIntoView({ y: 0, animated: true });
        downAnimated();
        setTimeout(lockEnd, 500);
    };

    return (
        <TouchableWithoutFeedback onPressIn={scaleDown} onPressOut={scaleUp} onPress={handleIconClick}>
            <View style={styles.container}>
                <Animated.View style={animatedContainerStyle}>
                    <Animated.View style={[buttonSize, styles.content, scaleStyle]}>
                        <UpArrow />
                    </Animated.View>
                </Animated.View>
            </View>
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
        borderWidth: 1,
        borderColor: color.Gray[200].toString(),
        backgroundColor: color.White.toString(),
        borderRadius: 9999,
    },
});

export default ScrollToTopButton;
