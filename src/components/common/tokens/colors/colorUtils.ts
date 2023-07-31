export const rgba = (color: string) => {
    const replaceColor = color.replace('#', '');

    const twoDigitHexR = replaceColor.substring(0, 2);
    const twoDigitHexG = replaceColor.substring(2, 4);
    const twoDigitHexB = replaceColor.substring(4, 6);
    const twoDigitHexA = replaceColor.substring(6, 8);

    const r = parseInt(twoDigitHexR, 16);
    const g = parseInt(twoDigitHexG, 16);
    const b = parseInt(twoDigitHexB, 16);
    const a = Number((parseInt(twoDigitHexA, 16) / 255).toFixed(2));

    return `rgb(${r},${g},${b},${a})`;
};

export const alpha = (color: string, opacity: number) => {
    const replaceColor = color.replace('#', '');
    opacity = opacity > 1 ? 1 : opacity;
    const rgb = replaceColor.substring(0, 6);
    const a = Math.round(opacity * 255).toString(16);

    return '#'.concat(rgb, a === '0' ? '00' : a);
};

export const makeColor = (color: string) => {
    const parsedColor = parseColor(color);
    return {
        rgba: () => rgba(parsedColor),
        alpha: (opacity: number) => {
            const alphaColor = alpha(parsedColor, opacity);
            return {
                rgba: () => rgba(alphaColor),
                toString: () => alphaColor,
            };
        },
        toString: () => parsedColor,
    };
};

const parseColor = (color: string) => {
    const colorSize = color.length;
    const replaceColor = color.replace('#', '');
    const isShort = colorSize === 3 || colorSize === 4;
    const hasAlpha = colorSize === 4 || colorSize === 8;

    const twoDigitHexR = isShort ? replaceColor.substring(0, 1).repeat(2) : replaceColor.substring(0, 2);
    const twoDigitHexG = isShort ? replaceColor.substring(1, 2).repeat(2) : replaceColor.substring(2, 4);
    const twoDigitHexB = isShort ? replaceColor.substring(2, 3).repeat(2) : replaceColor.substring(4, 6);
    const twoDigitHexA = hasAlpha ? (isShort ? replaceColor.substring(3, 4).repeat(2) : replaceColor.substring(6, 8)) : 'FF';

    return '#'.concat(twoDigitHexR, twoDigitHexG, twoDigitHexB, twoDigitHexA);
};
