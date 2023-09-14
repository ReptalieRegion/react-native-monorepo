import { color } from 'design-system';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { ScrollIntoViewProps } from '<FlashList>';
import type { FloatingActionButtonSize } from '<SharePostComponent>';
import { UpArrow } from '@/assets/icons';
import FloatingActionButton, { IconStyle } from '@/components/common/element/button/FloatingActionButton';
import useLock from '@/hooks/useLock';

export type ScrollToTopButtonAnimationMode = 'UP' | 'DOWN' | 'STOP';

export type ScrollTopButtonProps = {
    animationMode: ScrollToTopButtonAnimationMode;
    scrollIntoView: (props: ScrollIntoViewProps) => void;
};

const ANIMATION_DURATION = 300;
const LOCK_DURATION = 500;

const ScrollToTopButton = ({
    width,
    height,
    animationMode,
    scrollIntoView,
}: ScrollTopButtonProps & FloatingActionButtonSize) => {
    const { isLock, lockEnd, lockStart } = useLock();
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    const animateButton = useCallback(
        (direction: ScrollToTopButtonAnimationMode) => {
            const animateValue = {
                translateY: direction === 'UP' ? -(height + 10) : 0,
                opacity: direction === 'UP' ? 1 : 0,
            };

            translateY.value = withTiming(animateValue.translateY, { duration: ANIMATION_DURATION });
            opacity.value = withTiming(animateValue.opacity, { duration: ANIMATION_DURATION });
        },
        [height, opacity, translateY],
    );

    useEffect(() => {
        if (!isLock()) {
            animateButton(animationMode);
        }
    }, [animationMode, isLock, animateButton]);

    const handleIconClick = () => {
        lockStart();
        scrollIntoView({ offset: 0 });
        animateButton('DOWN');
        setTimeout(lockEnd, LOCK_DURATION);
    };

    return (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
            <FloatingActionButton
                iconStyle={{
                    width,
                    height,
                    ...iconStyle,
                }}
                Icon={UpArrow}
                onPress={handleIconClick}
            />
        </Animated.View>
    );
};

const iconStyle: IconStyle = {
    backgroundColor: color.White.toString(),
    borderColor: color.Gray[200].toString(),
    borderWidth: 1,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
});

export default ScrollToTopButton;
