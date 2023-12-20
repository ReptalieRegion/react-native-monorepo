import type { ColorValue, TextStyle } from 'react-native';

export type FontWeightType = 'heavy' | 'bold' | 'semibold' | 'medium' | 'regular' | 'light' | 'thin';
export type FontWeight = {
    [key in FontWeightType]: TextStyle['fontWeight'];
};

export type VariantType =
    | 'heading1'
    | 'heading1Bold'
    | 'heading1Light'
    | 'heading2'
    | 'heading3'
    | 'heading4'
    | 'title1'
    | 'title2'
    | 'title3'
    | 'title4'
    | 'title5'
    | 'title6'
    | 'body1'
    | 'body2'
    | 'body3'
    | 'body4'
    | 'body5';
export type Variant = {
    [key in VariantType]: {
        fontWeight: TextStyle['fontWeight'];
        lineHeight: TextStyle['lineHeight'];
        fontSize: TextStyle['fontSize'];
    };
};

export type TextColorType =
    | 'primary'
    | 'secondary'
    | 'light-placeholder'
    | 'placeholder'
    | 'sub-placeholder'
    | 'error'
    | 'surface'
    | 'require'
    | 'default'
    | 'sub-default'
    | 'error-toast'
    | 'warning-toast'
    | 'info-toast'
    | 'success-toast';
export type TextLightColor = {
    [key in TextColorType]: ColorValue;
};

export type TextAlign = TextStyle['textAlign'];
export type TextAlignVertical = TextStyle['textAlignVertical'];
