import React, { useEffect, useRef } from 'react';
import { TUIPromptsDefaultProps } from '<UIPrompts>';
import { Animated, Dimensions, Easing, StyleSheet, Text } from 'react-native';
import { trigger } from 'react-native-haptic-feedback';

interface IToastContainerProps extends TUIPromptsDefaultProps {
    text: string;
    containerStyle?: {
        backgroundColor: string;
    };
    textStyle?: {
        color: string;
    };
}

const screenWidth = Dimensions.get('screen').width;
const toastWidth = screenWidth * 0.95;

const ToastContainer = ({ uiPromptsClose, text, containerStyle, textStyle }: IToastContainerProps) => {
    const translateY = useRef(new Animated.Value(0)).current;
    const translateX = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const startAnimation = () => {
            Animated.timing(translateY, {
                toValue: 41,
                duration: 200,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    setTimeout(endAnimation, 1500);
                }
            });
        };

        const endAnimation = () => {
            Animated.timing(translateX, {
                toValue: screenWidth,
                duration: 200,
                easing: Easing.cubic,
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    uiPromptsClose();
                }
            });
        };

        trigger('impactLight', { enableVibrateFallback: true, ignoreAndroidSystemSettings: false });
        startAnimation();
    }, [uiPromptsClose, translateY, translateX]);

    const customStyles = StyleSheet.create({
        container: {
            ...containerStyle,
        },
        text: {
            ...textStyle,
        },
    });

    return (
        <Animated.View style={[styles.container, customStyles.container, { transform: [{ translateY }, { translateX }] }]}>
            <Text style={[customStyles.text]}>{text}</Text>
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
