import { color } from 'design-system';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { FloatingActionButtonSize } from '<SharePostComponent>';
import { UpArrow } from '@/assets/icons';
import FloatingActionButton, { IconStyle } from '@/components/common/element/button/FloatingActionButton';
import type { ScrollDirection, ScrollToTop } from '@/hooks/flash-list/useFlashListScroll';

export type ScrollTopButtonProps = {
    animationMode: ScrollDirection;
    scrollToTop: ScrollToTop;
};

const ANIMATION_DURATION = 300;

const ScrollToTopButton = ({ width, height, animationMode, scrollToTop }: ScrollTopButtonProps & FloatingActionButtonSize) => {
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        const animateValue = {
            translateY: animationMode === 'UP' ? -(height + 10) : 0,
            opacity: animationMode === 'UP' ? 1 : 0,
        };

        translateY.value = withTiming(animateValue.translateY, { duration: ANIMATION_DURATION });
        opacity.value = withTiming(animateValue.opacity, { duration: ANIMATION_DURATION });
    }, [height, animationMode, opacity, translateY]);

    return (
        <Animated.View style={[styles.container, animatedContainerStyle]}>
            <FloatingActionButton
                iconStyle={{
                    width,
                    height,
                    ...iconStyle,
                }}
                Icon={UpArrow}
                onPress={scrollToTop}
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
