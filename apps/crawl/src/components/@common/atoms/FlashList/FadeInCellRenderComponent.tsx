import { CellContainer } from '@shopify/flash-list';
import React, { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

const AnimatedCellContainer = Animated.createAnimatedComponent(CellContainer);

function FadeInCellRenderComponent(props: any, _: any) {
    const opacity = useSharedValue(0);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            opacity: opacity.value,
        };
    }, []);

    useEffect(() => {
        opacity.value = withSpring(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <AnimatedCellContainer {...props} style={[animatedStyles, props.style]} />;
}

export default React.forwardRef(FadeInCellRenderComponent);
