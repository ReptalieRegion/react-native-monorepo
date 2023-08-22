import React from 'react';
import { Text, TextStyle, TouchableOpacityProps, View, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GenericTouchableProps } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable';

type TextButtonProps = {
    text: string;
    containerStyle?: ViewStyle;
    textStyle?: TextStyle;
} & Omit<TouchableOpacityProps & GenericTouchableProps, 'containerStyle' | 'style'>;

const TextButton = ({
    text,
    containerStyle = { width: '100%' },
    textStyle = { textAlign: 'center' },
    activeOpacity = 0.5,
    onPress,
    ...rest
}: TextButtonProps) => {
    return (
        <TouchableOpacity activeOpacity={activeOpacity} onPress={onPress} {...rest}>
            <View style={containerStyle}>
                <Text style={textStyle}>{text}</Text>
            </View>
        </TouchableOpacity>
    );
};

export default TextButton;
