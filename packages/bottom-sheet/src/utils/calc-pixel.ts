type GetPixelProps = {
    baseHeight: number;
    snapPoint: number | string;
};

export const getPixel = ({ baseHeight, snapPoint }: GetPixelProps) => {
    if (typeof snapPoint === 'string' && snapPoint.endsWith('%')) {
        const percentage = parseFloat(snapPoint);
        return (baseHeight * percentage) / 100;
    }

    if (typeof snapPoint === 'number') {
        return snapPoint;
    }

    throw new Error('pointsFromTop에 string 또는 number를 입력해주세요.');
};
