import React, { useRef } from 'react';
import { ColorValue, DimensionValue, StyleSheet, TextInputProps, View } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, { Easing, WithTimingConfig, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { color } from '../../tokens/colors';

type FontSizes = 'small' | 'normal' | 'large';

type Variant = 'outlined' | 'standard';

export type TextFieldProps = {
    label: string;
    value?: string;
    labelColor?: ColorValue;
    focusColor?: ColorValue;
    size?: FontSizes;
    width?: DimensionValue;
    borderWidth?: number;
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

const TextField = ({
    onChangeText,
    label,
    value,
    width = '100%',
    size = 'normal',
    variant = 'standard',
    paddingVertical = 10,
    paddingHorizontal = 0,
    borderWidth = 1,
    labelColor = color.Gray[400].toString(),
    focusColor = color.Teal[150].toString(),
}: TextFieldProps) => {
    const textRef = useRef<TextInput>(null);
    const isExistsText = useRef<boolean>(false);
    const fieldColor = useSharedValue<ColorValue | undefined>(labelColor);
    const labelFontSize = useSharedValue<number>(LABEL_FONT_SIZE[size].blur);
    const top = useSharedValue<number>(paddingVertical);
    const left = useSharedValue<number>(paddingHorizontal);

    const borderAnimated = useAnimatedStyle(() => {
        if (variant === 'standard') {
            return {
                borderColor: fieldColor.value,
                borderBottomWidth: borderWidth,
            };
        }

        if (variant === 'outlined') {
            return {
                borderColor: fieldColor.value,
                borderWidth,
            };
        }

        return {
            borderColor: fieldColor.value,
            borderWidth,
        };
    });

    const labelViewAnimated = useAnimatedStyle(() => ({
        top: top.value,
        left: left.value,
    }));

    const labelTextAnimated = useAnimatedStyle(() => ({
        color: fieldColor.value,
        fontSize: labelFontSize.value,
    }));

    const handleContainerClick = () => {
        textRef.current?.focus();
    };

    const handleTextInputFocus = () => {
        fieldColor.value = focusColor;
        labelFontSize.value = withTiming(LABEL_FONT_SIZE[size].focus, userConfig);
        top.value = withTiming(-(LABEL_FONT_SIZE[size].focus / 2), userConfig);
        left.value = withTiming(variant === 'outlined' ? 5 : 0, userConfig);
    };

    const handleTextInputBlur = () => {
        if (isExistsText.current) {
            return;
        }

        fieldColor.value = labelColor;
        labelFontSize.value = withTiming(LABEL_FONT_SIZE[size].blur, userConfig);
        top.value = withTiming(paddingVertical, userConfig);
        left.value = withTiming(paddingHorizontal, userConfig);
    };

    const handleChangeText = (text: string) => {
        isExistsText.current = text.length !== 0;
        onChangeText?.(text);
    };

    return (
        <View style={{ width }}>
            <TouchableWithoutFeedback onPress={handleContainerClick}>
                <Animated.View style={[styles.container, borderAnimated, { paddingVertical, paddingHorizontal }]}>
                    <TextInput
                        ref={textRef}
                        style={styles.textInput}
                        value={value}
                        onFocus={handleTextInputFocus}
                        onBlur={handleTextInputBlur}
                        onChangeText={handleChangeText}
                    />
                </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.textInputContainer, labelViewAnimated]}>
                <TouchableWithoutFeedback onPress={handleContainerClick}>
                    <Animated.Text style={labelTextAnimated}>{label}</Animated.Text>
                </TouchableWithoutFeedback>
            </Animated.View>
        </View>
    );
};

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
});

export default TextField;
