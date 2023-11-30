import { color } from '@reptile-region/design-system';
import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

const Share = ({
    fill = color.Gray[400].toString(),
    stroke = color.Gray[400].toString(),
    height = '24',
    width = '24',
}: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <Circle cx="19.5" cy="3.5" r="2.5" fill={fill} stroke={stroke} />
            <Circle cx="19.5" cy="20.5" r="2.5" fill={fill} stroke={stroke} />
            <Circle cx="3.5" cy="12" r="2.5" fill={fill} stroke={stroke} />
            <Path d="M5.5 10L17 4.5" stroke={stroke} stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M5.5 14L17 19.5" stroke={stroke} stroke-miterlimit="3.99933" stroke-linecap="round" />
        </Svg>
    );
};

export default Share;
