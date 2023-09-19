import React from 'react';
import { TextProps, Text } from 'react-native';

import { textLightColor, variantMap } from '../../token/text';
import { TextAlign, TextColorType, VariantType, TextAlignVertical } from '../../types/token/text';

export interface TypoProps extends Omit<TextProps, 'style'> {
    variant?: VariantType;
    color?: TextColorType;
    textAlign?: TextAlign;
    textAlignVertical?: TextAlignVertical;
}

const Typo = ({
    children,
    variant = 'body2',
    color = 'default',
    textAlign = 'auto',
    textAlignVertical = 'auto',
    suppressHighlighting = true,
    ...rest
}: TypoProps) => {
    const variantStyle = variantMap[variant];

    return (
        <Text
            {...rest}
            style={[
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
        </Text>
    );
};

export default Typo;
