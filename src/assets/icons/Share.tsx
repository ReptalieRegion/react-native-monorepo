import React from 'react';
import { IIconProps } from '<Icon>';
import { Circle, Path, Svg } from 'react-native-svg';

const Share = ({ fill = '#868E96FF', height = '24', width = '24' }: IIconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24">
            <Circle cx="19.5" cy="3.5" r="2.5" fill={fill} stroke="black" />
            <Circle cx="19.5" cy="20.5" r="2.5" fill={fill} stroke="black" />
            <Circle cx="3.5" cy="12" r="2.5" fill={fill} stroke="black" />
            <Path d="M5.5 10L17 4.5" stroke="black" stroke-miterlimit="3.99933" stroke-linecap="round" />
            <Path d="M5.5 14L17 19.5" stroke="black" stroke-miterlimit="3.99933" stroke-linecap="round" />
        </Svg>
    );
};

export default Share;
