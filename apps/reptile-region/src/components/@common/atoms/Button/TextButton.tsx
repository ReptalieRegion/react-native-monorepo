import type { TextAlign, TextAlignVertical, TextColorType, VariantType } from '@reptile-region/design-system';
import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import type { TouchableOpacityProps, ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import type { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

type ButtonType = 'view' | 'text' | 'outline' | 'underLine';

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
        padding: 10,
        border: border === 'OVAL' ? 20 : type === 'underLine' ? 0 : 4,
        borderBottom: type === 'underLine' ? 1 : undefined,
        textColor: disabled ? 'placeholder' : textColor,
        borderWidth: type === 'outline' || type === 'underLine' ? 1 : undefined,
        borderColor: type === 'outline' ? color.Gray[400].toString() : undefined,
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
                        borderWidth: generatedStyle.borderWidth,
                        borderColor: generatedStyle.borderColor,
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
        justifyContent: 'center',
    },
    text: {
        fontSize: 14,
        textAlign: 'center',
    },
});
