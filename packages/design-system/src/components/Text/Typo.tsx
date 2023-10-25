import React from 'react';
import type { TextProps } from 'react-native';
import { Text } from 'react-native';

import { textLightColor, variantMap } from '../../token/text';
import type { TextAlign, TextAlignVertical, TextColorType, VariantType } from '../../types/token/text';

export interface TypoProps extends Omit<TextProps, 'style'> {
    variant?: VariantType;
    color?: TextColorType;
    textAlign?: TextAlign;
    textAlignVertical?: TextAlignVertical;
    fontFamily?: string | undefined;
}

const Typo = ({
    children,
    variant = 'body2',
    color = 'default',
    textAlign = 'auto',
    textAlignVertical = 'auto',
    suppressHighlighting = true,
    fontFamily = undefined,
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
                    fontFamily,
                },
            ]}
            suppressHighlighting={suppressHighlighting}
        >
            {children}
        </Text>
    );
};

Typo.FontFamily = {
    'DancingScript-SemiBold': 'DancingScript-SemiBold',
    'DancingScript-Regular': 'DancingScript-Regular',
    'DancingScript-Medium': 'DancingScript-Medium',
    'DancingScript-Bold': 'DancingScript-Medium',
};

Typo.FontFamilyOnlyAndroid = {
    'Roboto-Medium': 'Roboto-Medium',
};

export default Typo;
