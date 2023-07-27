import React, { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import UpArrow from '@/assets/icons/UpArrow';
import { color } from '@/components/common/tokens/colors';
import { FloatingActionButtonSize } from '<SharePostComponent>';
import { ScrollContext } from '@/contexts/scroll/ScrollContext';
import useScaleDownAndUp from '../animated/useScaleDownAndUp';

interface ScrollToTopButtonAnimationProps {
    translateY: Animated.Value;
    opacity: Animated.Value;
    moveY?: number;
}

const upAnimation = ({ translateY, opacity, moveY }: ScrollToTopButtonAnimationProps) => {
    Animated.parallel([
        Animated.timing(translateY, {
            toValue: moveY ?? 60,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }),
    ]).start();
};

const downAnimation = ({ translateY, opacity }: ScrollToTopButtonAnimationProps) => {
    Animated.parallel([
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }),
        Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }),
    ]).start();
};

const ScrollToTopButton = ({ buttonSize }: FloatingActionButtonSize) => {
    const { scrollDirection, scrollInfo, scrollIntoView } = useContext(ScrollContext);
    const { scale, scaleDown, scaleUp } = useScaleDownAndUp();
    const translateYRef = useRef(new Animated.Value(0));
    const opacityRef = useRef(new Animated.Value(1));

    useEffect(() => {
        const translateY = translateYRef.current;
        const opacity = opacityRef.current;

        if (scrollDirection === 'UP') {
            upAnimation({ translateY, opacity, moveY: -(buttonSize.height + 10) });
            return;
        }

        if (scrollDirection === 'DOWN') {
            downAnimation({ translateY, opacity });
            return;
        }
    }, [buttonSize.height, scrollDirection, scrollInfo.contentOffset.y]);

    const handleIconClick = () => {
        scrollIntoView({ y: 0, animated: true });
    };

    return (
        <TouchableOpacity
            onPressIn={scaleDown}
            onPressOut={scaleUp}
            onPress={handleIconClick}
            style={styles.container}
            activeOpacity={1}
        >
            <Animated.View style={{ transform: [{ translateY: translateYRef.current }], opacity: opacityRef.current }}>
                <Animated.View style={[buttonSize, styles.content, { transform: [{ scale }] }]}>
                    <UpArrow />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
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
        backgroundColor: color.White[50].toString(),
        borderRadius: 9999,
    },
});

export default ScrollToTopButton;
