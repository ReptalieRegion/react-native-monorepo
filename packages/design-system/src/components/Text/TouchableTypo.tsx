import React from 'react';
import { TextProps } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { textLightColor, variantMap } from '../../token/text';
import { TextAlign, TextColorType, VariantType, TextAlignVertical } from '../../types/token/text';

export interface TouchableTextProps extends Omit<TextProps, 'style'> {
    variant?: VariantType;
    color?: TextColorType;
    activeOpacity?: number;
    textAlign?: TextAlign;
    textAlignVertical?: TextAlignVertical;
}

const TouchableTypo = ({
    children,
    activeOpacity = 0.5,
    variant = 'body2',
    color = 'default',
    textAlign = 'auto',
    textAlignVertical = 'auto',
    suppressHighlighting = true,
    ...rest
}: TouchableTextProps) => {
    const variantStyle = variantMap[variant];
    const opacity = useSharedValue(1);
    const animated = useAnimatedStyle(() => ({ opacity: opacity.value }));

    const handlePressIn = () => {
        opacity.value = activeOpacity;
    };

    const handlePressOut = () => {
        opacity.value = 1;
    };

    return (
        <Animated.Text
            {...rest}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            style={[
                animated,
                variantStyle,
                {
                    textAlign,
                    textAlignVertical,
                    color: textLightColor[color],
                },
            ]}
            suppressHighlighting={suppressHighlighting}
        >
            {children}
        </Animated.Text>
    );
};

export default TouchableTypo;
