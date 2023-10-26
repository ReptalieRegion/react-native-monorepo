import type { TextAlign, TextAlignVertical, TextColorType, VariantType } from '@reptile-region/design-system';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import type { TextStyle, TouchableOpacityProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

type ButtonType = 'view' | 'text';

type TextButtonProps = {
    text: string;
    type: ButtonType;
    border?: 'OVAL' | 'RECTANGLE';
    textInfo?: {
        color?: TextColorType;
        variant?: VariantType;
        textAlign?: TextAlign;
        textAlignVertical?: TextAlignVertical;
    };
    containerStyle?: Pick<ViewStyle, 'height' | 'width' | 'padding' | 'paddingVertical' | 'paddingHorizontal'>;
    touchableProps?: Omit<TouchableOpacityProps & GenericTouchableProps, 'containerStyle' | 'style'>;
};

type VariantStyles = {
    view?: ViewStyle;
    text?: TextStyle;
};

const VARIANT_STYLES: VariantStyles = {
    view: {
        backgroundColor: color.Teal[150].toString(),
        padding: 10,
    },
    text: {
        color: color.White.toString(),
    },
};

export default function TextButton({
    text,
    type = 'text',
    border = 'RECTANGLE',
    textInfo = {
        variant: 'body4',
    },
    containerStyle = {
        width: '100%',
        padding: 10,
    },
    touchableProps = {
        activeOpacity: 0.5,
    },
}: TextButtonProps) {
    const borderRadius = border === 'OVAL' ? 20 : 4;

    return (
        <TouchableOpacity activeOpacity={touchableProps.activeOpacity} onPress={touchableProps.onPress} {...touchableProps}>
            <View style={[styles.container, VARIANT_STYLES[type], containerStyle, { borderRadius }]}>
                <Typo
                    variant={textInfo.variant}
                    textAlign={textInfo.textAlign}
                    textAlignVertical={textInfo.textAlignVertical}
                    color={textInfo.color}
                >
                    {text}
                </Typo>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
});
