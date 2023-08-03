import React, { useContext, useEffect } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import UpArrow from '@/assets/icons/UpArrow';
import { color } from '@/components/common/tokens/colors';
import { FloatingActionButtonSize } from '<SharePostComponent>';
import { ScrollContext } from '@/contexts/scroll/ScrollContext';
import useScaleDownAndUp from '../animated/useScaleDownAndUp';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const ScrollToTopButton = ({ buttonSize }: FloatingActionButtonSize) => {
    const { scrollDirection, scrollIntoView } = useContext(ScrollContext);
    const { scaleStyle, scaleDown, scaleUp } = useScaleDownAndUp();
    const translateY = useSharedValue(0);
    const opacity = useSharedValue(0);
    const animatedContainerStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
        opacity: opacity.value,
    }));

    useEffect(() => {
        if (scrollDirection === 'UP') {
            translateY.value = withTiming(-(buttonSize.height + 10), { duration: 300 });
            opacity.value = withTiming(1, { duration: 300 });
            return;
        }

        if (scrollDirection === 'DOWN') {
            translateY.value = withTiming(0, { duration: 300 });
            opacity.value = withTiming(0, { duration: 300 });
            return;
        }
    }, [buttonSize.height, scrollDirection, translateY, opacity]);

    const handleIconClick = () => {
        scrollIntoView({ y: 0, animated: true });
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
