import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

type Variant = 'filled' | 'none';

type TextButtonProps = {
    text: string;
    variant?: Variant;
    containerStyle?: Pick<ViewStyle, 'height' | 'width' | 'padding' | 'paddingVertical' | 'paddingHorizontal'>;
    textStyle?: Pick<
        TextStyle,
        | 'textAlign'
        | 'verticalAlign'
        | 'fontSize'
        | 'fontFamily'
        | 'fontStyle'
        | 'fontVariant'
        | 'fontWeight'
        | 'lineHeight'
        | 'letterSpacing'
    >;
} & Omit<TouchableOpacityProps & GenericTouchableProps, 'containerStyle' | 'style'>;

type VariantStyles = {
    [key in Variant]?: {
        view?: ViewStyle;
        text?: TextStyle;
    };
};

const VARIANT_STYLES: VariantStyles = {
    filled: {
        view: {
            backgroundColor: color.Teal[150].toString(),
            padding: 10,
        },
        text: {
            color: color.White.toString(),
        },
    },
};

const TextButton = ({
    text,
    containerStyle = { width: '100%', padding: 10 },
    textStyle,
    activeOpacity = 0.5,
    variant = 'none',
    onPress,
    ...rest
}: TextButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress} {...rest}>
            <View style={[styles.container, VARIANT_STYLES[variant]?.view, containerStyle]}>
                <Text style={[styles.text, textStyle, VARIANT_STYLES[variant]?.text]}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 4,
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
});

export default TextButton;
