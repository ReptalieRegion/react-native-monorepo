import { Typo, color } from '@reptile-region/design-system';
import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import type { ColorValue, DimensionValue, TextInputProps } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import type { WithTimingConfig } from 'react-native-reanimated';

type FontSizes = 'small' | 'normal' | 'large';

type Variant = 'outlined' | 'standard';

export type TextFieldProps = {
    label: string;
    value?: string;
    errorMessage?: string;
    autoFocus?: boolean;
    secureTextEntry?: boolean;
    errorMessColor?: ColorValue;
    labelColor?: ColorValue;
    focusColor?: ColorValue;
    size?: FontSizes;
    width?: DimensionValue;
    borderWidth?: number;
    borderRadius?: number;
    paddingVertical?: number;
    paddingHorizontal?: number;
    animationDuration?: number;
    variant?: Variant;
} & Pick<TextInputProps, 'onChangeText'>;

type LabelFontSize = {
    [key in FontSizes]: {
        focus: number;
        blur: number;
    };
};

const userConfig: WithTimingConfig = {
    duration: 200,
    easing: Easing.ease,
};

const LABEL_FONT_SIZE: LabelFontSize = {
    small: {
        focus: 12,
        blur: 14,
    },
    normal: {
        focus: 14,
        blur: 16,
    },
    large: {
        focus: 16,
        blur: 18,
    },
};

export default function TextField({
    onChangeText,
    label,
    value,
    errorMessage,
    secureTextEntry = false,
    autoFocus = false,
    width = '100%',
    size = 'normal',
    variant = 'standard',
    paddingVertical = 10,
    paddingHorizontal = 0,
    borderWidth = 1,
    borderRadius,
    errorMessColor = color.Red[500].toString(),
    labelColor = color.Gray[400].toString(),
    focusColor = color.Teal[150].toString(),
}: TextFieldProps) {
    const textRef = useRef<TextInput>(null);
    const isExistsText = useRef<boolean>(false);
    const fieldColor = useSharedValue<ColorValue | undefined>(labelColor);
    const labelFontSize = useSharedValue<number>(LABEL_FONT_SIZE[size].blur);
    const top = useSharedValue<number>(paddingVertical);

    const borderAnimated = useAnimatedStyle(() => {
        if (variant === 'standard') {
            return {
                borderColor: fieldColor.value,
                borderBottomWidth: borderWidth,
                borderRadius,
            };
        }

        if (variant === 'outlined') {
            return {
                borderColor: fieldColor.value,
                borderWidth,
                borderRadius,
            };
        }

        return {
            borderColor: fieldColor.value,
            borderWidth,
            borderRadius,
        };
    });

    const labelViewAnimated = useAnimatedStyle(() => ({
        top: top.value,
    }));

    const labelTextAnimated = useAnimatedStyle(() => ({
        color: fieldColor.value,
        fontSize: labelFontSize.value,
    }));

    useEffect(() => {
        if (autoFocus) {
            textRef.current?.focus();
        }
    }, [autoFocus]);

    useEffect(() => {
        if (errorMessage) {
            fieldColor.value = errorMessColor;
        }
    }, [errorMessColor, errorMessage, fieldColor]);

    const handleFocus = () => {
        textRef.current?.focus();
    };

    const handleTextInputFocus = () => {
        fieldColor.value = focusColor;
        labelFontSize.value = withTiming(LABEL_FONT_SIZE[size].focus, userConfig);
        const newTop = Platform.OS === 'android' ? -(LABEL_FONT_SIZE[size].blur / 2) : -(LABEL_FONT_SIZE[size].focus / 2);
        top.value = withTiming(newTop, userConfig);
    };

    const handleTextInputBlur = () => {
        if (isExistsText.current) {
            return;
        }

        fieldColor.value = labelColor;
        labelFontSize.value = withTiming(LABEL_FONT_SIZE[size].blur, userConfig);
        top.value = withTiming(paddingVertical, userConfig);
    };

    const handleChangeText = (text: string) => {
        isExistsText.current = text.length !== 0;
        onChangeText?.(text);
    };

    return (
        <View style={{ width }}>
            <TouchableWithoutFeedback onPress={handleFocus}>
                <Animated.View style={[styles.container, borderAnimated, { paddingVertical, paddingHorizontal }]}>
                    <TextInput
                        ref={textRef}
                        style={styles.textInput}
                        value={value}
                        secureTextEntry={secureTextEntry}
                        onFocus={handleTextInputFocus}
                        onBlur={handleTextInputBlur}
                        onChangeText={handleChangeText}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.textInputContainer, labelViewAnimated, { marginHorizontal: paddingHorizontal }]}>
                <TouchableWithoutFeedback onPress={handleFocus}>
                    <Animated.Text style={[labelTextAnimated]}>{label}</Animated.Text>
                </TouchableWithoutFeedback>
            </Animated.View>
            <View style={[styles.error, { paddingHorizontal }]}>
                <Typo variant="body4" color="error">
                    {errorMessage}
                </Typo>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    textInputContainer: {
        position: 'absolute',
        backgroundColor: color.White.toString(),
    },
    textInput: {
        padding: 0,
    },
    error: {
        marginTop: 5,
    },
});
