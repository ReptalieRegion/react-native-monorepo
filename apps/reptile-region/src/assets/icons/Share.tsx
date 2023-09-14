import { color } from 'design-system';
import React from 'react';
import { Circle, Path, Svg } from 'react-native-svg';

import type { IconProps } from '<Icon>';

const Share = ({ fill = color.Gray['500'].toString(), height = '24', width = '24' }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <Circle cx="19.5" cy="3.5" r="2.5" fill={fill} stroke={color.Black.toString()} />
            <Circle cx="19.5" cy="20.5" r="2.5" fill={fill} stroke={color.Black.toString()} />
            <Circle cx="3.5" cy="12" r="2.5" fill={fill} stroke={color.Black.toString()} />
            <Path d="M5.5 10L17 4.5" stroke={color.Black.toString()} stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M5.5 14L17 19.5" stroke={color.Black.toString()} stroke-miterlimit="3.99933" stroke-linecap="round" />
        </Svg>
    );
};

export default Share;
