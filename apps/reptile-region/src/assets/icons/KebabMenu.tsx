import React from 'react';
import { Circle, Svg } from 'react-native-svg';

import type { IconProps } from '<Icon>';
import { color } from '@/components/common/tokens/colors';

const KebabMenu = ({ width = '24', height = '24', fill = color.Gray[900].toString() }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Circle cx="22.8" cy="6" r="1.2" fill={fill} />
            <Circle cx="22.8" cy="12" r="1.2" fill={fill} />
            <Circle cx="22.8" cy="18" r="1.2" fill={fill} />
        </Svg>
    );
};

export default KebabMenu;
