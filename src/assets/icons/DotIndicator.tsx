import { IconProps } from '<Icon>';
import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const DotIndicator = ({ fill }: IconProps) => {
    return (
        <Svg height="10" width="10">
            <Circle cx="5" cy="5" r="4" fill={fill} />
        </Svg>
    );
};

export default DotIndicator;
