import type { FontWeight, TextLightColor, Variant } from '../types/token/text';

import color from './color';

const fontWeightMap: FontWeight = {
    heavy: '900',
    bold: '700',
    semibold: '600',
    medium: '500',
    regular: '400',
    light: '300',
    thin: '100',
} as const;

export const variantMap: Variant = {
    // headline
    heading1: {
        fontWeight: fontWeightMap.heavy,
        lineHeight: 32,
        fontSize: 24,
    },
    heading1Light: {
        fontWeight: fontWeightMap.light,
        lineHeight: 32,
        fontSize: 24,
    },
    heading2: {
        fontWeight: fontWeightMap.bold,
        lineHeight: 25,
        fontSize: 17,
    },
    heading3: {
        fontWeight: fontWeightMap.bold,
        lineHeight: 22,
        fontSize: 14,
    },
    heading4: {
        fontWeight: fontWeightMap.regular,
        lineHeight: 21,
        fontSize: 13,
    },
    // title
    title1: {
        fontWeight: fontWeightMap.bold,
        lineHeight: 31,
        fontSize: 23,
    },
    title2: {
        fontWeight: fontWeightMap.semibold,
        lineHeight: 27,
        fontSize: 19,
    },
    title3: {
        fontWeight: fontWeightMap.semibold,
        lineHeight: 24,
        fontSize: 16,
    },
    title4: {
        fontWeight: fontWeightMap.medium,
        lineHeight: 23,
        fontSize: 15,
    },
    title5: {
        fontWeight: fontWeightMap.medium,
        lineHeight: 22,
        fontSize: 14,
    },
    title6: {
        fontWeight: fontWeightMap.medium,
        lineHeight: 20,
        fontSize: 12,
    },
    // body
    body1: {
        fontWeight: fontWeightMap.regular,
        lineHeight: 20,
        fontSize: 16,
    },
    body2: {
        fontWeight: fontWeightMap.regular,
        lineHeight: 18,
        fontSize: 14,
    },
    body3: {
        fontWeight: fontWeightMap.regular,
        lineHeight: 17,
        fontSize: 13,
    },
    body4: {
        fontWeight: fontWeightMap.regular,
        lineHeight: 16,
        fontSize: 12,
    },
    body5: {
        fontWeight: fontWeightMap.regular,
        lineHeight: 14,
        fontSize: 10,
    },
} as const;

export const textLightColor: TextLightColor = {
    primary: color.Green[750].toString(),
    secondary: color.Teal[150].toString(),
    surface: color.White.toString(),
    placeholder: color.Gray[500].toString(),
    'sub-placeholder': color.Gray[800].toString(),
    require: color.Red[600].toString(),
    error: color.Red[500].toString(),
    default: color.Black.toString(),
    'error-toast': color.Red.A800.toString(),
    'warning-toast': color.Brown.A800.toString(),
    'info-toast': color.Blue.A800.toString(),
    'success-toast': color.Green.A800.toString(),
} as const;
