interface IColor {
    rgb(): string;
    alpha(val: number): Color;
    toString(): string;
}

interface RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
}

class Color implements IColor {
    constructor(private color: string) {
        this.color = this.paseColor(color);
    }

    toString(): string {
        return this.color;
    }

    alpha(val: number): Color {
        const replaceColor = this.color.replace('#', '');
        val = val > 1 ? 1 : val;
        const rgb = replaceColor.substring(0, 6);
        const a = Math.round(val * 255).toString(16);
        this.color = '#'.concat(rgb, a === '0' ? '00' : a);

        return this;
    }

    rgb(): string {
        const { r, g, b, a } = this.changeToRGBA();
        return `rgb(${r}, ${g}, ${b}, ${a})`;
    }

    private changeToRGBA(): RGBA {
        const replaceColor = this.color.replace('#', '');

        const twoDigitHexR = replaceColor.substring(0, 2);
        const twoDigitHexG = replaceColor.substring(2, 4);
        const twoDigitHexB = replaceColor.substring(4, 6);
        const twoDigitHexA = replaceColor.substring(6, 8);

        const r = parseInt(twoDigitHexR, 16);
        const g = parseInt(twoDigitHexG, 16);
        const b = parseInt(twoDigitHexB, 16);
        const a = Number((parseInt(twoDigitHexA, 16) / 255).toFixed(2));

        return { r, g, b, a };
    }

    private paseColor(color: string): string {
        const colorSize = color.length;
        const replaceColor = color.replace('#', '');
        const isShort = colorSize === 3 || colorSize === 4;
        const hasAlpha = colorSize === 4 || colorSize === 8;

        const twoDigitHexR = isShort ? replaceColor.substring(0, 1).repeat(2) : replaceColor.substring(0, 2);
        const twoDigitHexG = isShort ? replaceColor.substring(1, 2).repeat(2) : replaceColor.substring(2, 4);
        const twoDigitHexB = isShort ? replaceColor.substring(2, 3).repeat(2) : replaceColor.substring(4, 6);
        const twoDigitHexA = hasAlpha
            ? isShort
                ? replaceColor.substring(3, 4).repeat(2)
                : replaceColor.substring(6, 8)
            : 'FF';

        return '#'.concat(twoDigitHexR, twoDigitHexG, twoDigitHexB, twoDigitHexA);
    }
}

export default Color;
