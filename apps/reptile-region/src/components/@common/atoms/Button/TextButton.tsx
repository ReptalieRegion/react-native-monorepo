import type { TextAlign, TextAlignVertical, TextColorType, VariantType } from '@reptile-region/design-system';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import type { TouchableOpacityProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

type ButtonType = 'view' | 'text';

type BorderType = 'OVAL' | 'RECTANGLE';

type TextButtonState = {
    text: string;
    type: ButtonType;
    border?: BorderType;
    color?: TextColorType;
    variant?: VariantType;
    textAlignVertical?: TextAlignVertical;
    textAlign?: TextAlign;
    containerStyle?: Pick<ViewStyle, 'height' | 'width' | 'padding' | 'paddingVertical' | 'paddingHorizontal'>;
    touchableProps?: Omit<TouchableOpacityProps & GenericTouchableProps, 'containerStyle' | 'style' | 'disabled' | 'onPress'>;
    disabled?: boolean;
};

interface TextButtonActions {
    onPress?(): void;
}

type TextButtonProps = TextButtonState & TextButtonActions;

const styleGenerator = ({
    type,
    border,
    disabled,
    textColor,
}: {
    type: ButtonType;
    border: BorderType;
    disabled: boolean | undefined;
    textColor: TextColorType | undefined;
}) => {
    return {
        backgroundColor: disabled
            ? color.Gray[200].toString()
            : type === 'view'
            ? color.Teal[150].toString()
            : color.White.toString(),
        padding: type === 'view' ? 10 : undefined,
        border: border === 'OVAL' ? 20 : 4,
        textColor: disabled ? 'placeholder' : textColor,
    };
};

export default function TextButton({
    text,
    type = 'text',
    border = 'RECTANGLE',
    variant = 'body4',
    textAlign = 'center',
    containerStyle = {
        width: '100%',
        padding: 10,
    },
    color: textColor,
    textAlignVertical,
    touchableProps,
    disabled,
    onPress,
}: TextButtonProps) {
    const generatedStyle = styleGenerator({ type, border, disabled, textColor });

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} {...touchableProps}>
            <View
                style={[
                    styles.container,
                    containerStyle,
                    {
                        borderRadius: generatedStyle.border,
                        backgroundColor: generatedStyle.backgroundColor,
                        padding: generatedStyle.padding,
                    },
                ]}
            >
                <Typo
                    variant={variant}
                    textAlign={textAlign}
                    textAlignVertical={textAlignVertical}
                    color={generatedStyle.textColor}
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
