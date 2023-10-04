import { color } from 'design-system';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { WithTimingConfig, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import type { FloatingActionButtonSize } from '<SharePostComponent>';
import { UpArrow } from '@/assets/icons';
import { FloatingActionButton } from '@/components/@common/atoms';
import type { ScrollDirection, ScrollToTop } from '@/hooks/useFlashListScroll';

type ScrollTopButtonProps = {
    animationMode: ScrollDirection;
    scrollToTop: ScrollToTop;
};

const TIMING_CONFIG: WithTimingConfig = { duration: 300 };

export default function ScrollToTopButton({
    width,
    height,
    animationMode,
    scrollToTop,
}: ScrollTopButtonProps & FloatingActionButtonSize) {
    /** UI 로직 시작 */
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

        translateY.value = withTiming(animateValue.translateY, TIMING_CONFIG);
        opacity.value = withTiming(animateValue.opacity, TIMING_CONFIG);
    }, [height, animationMode, opacity, translateY]);
    /** UI 로직 끝 */
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
}

const iconStyle = {
    backgroundColor: color.White.toString(),
    borderColor: color.Gray[200].toString(),
    borderWidth: 1,
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
    },
});
