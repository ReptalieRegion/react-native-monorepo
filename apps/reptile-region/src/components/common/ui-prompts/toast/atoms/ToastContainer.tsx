import React, { useEffect } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withDelay,
    withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { UIPromptsDefaultProps } from '<UIPrompts>';
import Haptic from '../../../../../utils/webview-bridge/react-native/haptic/Haptic';

interface ToastContainerProps extends UIPromptsDefaultProps {
    text: string;
    containerStyle?: Pick<ViewStyle, 'backgroundColor'>;
    textStyle?: Pick<TextStyle, 'color'>;
}

const screenWidth = Dimensions.get('screen').width;
const toastWidth = screenWidth * 0.95;

const ToastContainer = ({ uiPromptsClose, text, containerStyle, textStyle }: ToastContainerProps) => {
    const { top } = useSafeAreaInsets();
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }, { translateY: translateY.value }],
    }));

    useDerivedValue(() => {
        const isFinishAnimation = translateX.value === screenWidth;
        if (isFinishAnimation) {
            runOnJS(uiPromptsClose)();
        }
    });

    useEffect(() => {
        Haptic.trigger({ type: 'impactLight' });

        const moveTranslateY = Platform.OS === 'ios' ? top : 10;
        translateY.value = withTiming(moveTranslateY, { duration: 200 }, () => {
            translateX.value = withDelay(1000, withTiming(screenWidth, { duration: 200 }));
        });
    }, [top, translateX, translateY]);

    return (
        <Animated.View style={[styles.container, containerStyle, animatedStyle]}>
            <Text style={textStyle}>{text}</Text>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
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
