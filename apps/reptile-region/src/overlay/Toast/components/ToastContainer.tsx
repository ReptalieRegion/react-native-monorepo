import { Typo } from 'design-system';
import React, { useEffect } from 'react';
import { Dimensions, Modal, StyleSheet } from 'react-native';
import Animated, { Easing, Keyframe } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useToastHandler from '../hooks/useToastHandler';
import useToastState from '../hooks/useToastState';
import createToastStyles from '../tokens/color';

const screenWidth = Dimensions.get('screen').width;
const toastWidth = screenWidth * 0.95;

export default function ToastContainer() {
    const { top } = useSafeAreaInsets();
    const { show, contents, severity, title } = useToastState();
    const { closeToast } = useToastHandler();
    const toastStyles = createToastStyles(severity);

    useEffect(() => {
        if (show) {
            const closeTime = setTimeout(closeToast, 1000);

            return () => {
                clearTimeout(closeTime);
            };
        }
    }, [show, closeToast]);

    const enteringKeyframe = new Keyframe({
        from: {
            transform: [{ translateY: 0 }],
            easing: Easing.exp,
        },
        to: {
            transform: [{ translateY: top }],
            easing: Easing.exp,
        },
    }).duration(100);

    const exitingKeyframe = new Keyframe({
        from: {
            transform: [{ translateX: 0 }],
            easing: Easing.exp,
        },
        to: {
            transform: [{ translateX: screenWidth }],
            easing: Easing.exp,
        },
    }).duration(1000);

    return (
        show && (
            <Modal transparent={true}>
                <Animated.View
                    entering={enteringKeyframe}
                    exiting={exitingKeyframe}
                    style={[styles.container, { backgroundColor: toastStyles.background }]}
                >
                    <Typo variant={'body2'} color={toastStyles.text}>
                        {title}
                        {contents}
                    </Typo>
                </Animated.View>
            </Modal>
        )
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: screenWidth / 2 - toastWidth / 2,
        width: toastWidth,
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
