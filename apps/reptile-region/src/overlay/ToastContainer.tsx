import { TextColorType, Typo, VariantType } from 'design-system';
import { OverlayList } from 'overlay';
import { useOverlay } from 'overlay-manager';
import React, { useEffect } from 'react';
import { Dimensions, Modal, Platform, StyleSheet, ViewStyle } from 'react-native';
import * as Haptic from 'react-native-haptic-feedback';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ToastContainerProps {
    text: string;
    containerStyle?: Pick<ViewStyle, 'backgroundColor'>;
    variant?: VariantType;
    color?: TextColorType;
}

const screenWidth = Dimensions.get('screen').width;
const toastWidth = screenWidth * 0.95;

const ToastContainer = ({ text, color, containerStyle, variant }: ToastContainerProps) => {
    const { top } = useSafeAreaInsets();
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const { closeOverlay } = useOverlay<OverlayList>();
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }));

    useDerivedValue(() => {
        const isFinishAnimation = translateX.value === screenWidth;
        if (isFinishAnimation) {
            runOnJS(closeOverlay)('toast');
        }
    });

    useEffect(() => {
        Haptic.trigger('impactLight');

        const moveTranslateY = Platform.OS === 'ios' ? top : 10;
        translateY.value = withTiming(moveTranslateY, { duration: 200 }, () => {
            translateX.value = withDelay(1000, withTiming(screenWidth, { duration: 200 }));
        });
    }, [top, translateX, translateY]);

    return (
        <Modal>
            <Animated.View style={[styles.container, containerStyle, animatedStyle]}>
                <Typo variant={variant} color={color}>
                    {text}
                </Typo>
            </Animated.View>
        </Modal>
    );
};

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

export default ToastContainer;
