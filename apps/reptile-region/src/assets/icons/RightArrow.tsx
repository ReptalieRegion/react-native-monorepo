import { color } from '@reptile-region/design-system';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function RightArrow({ height = 24, width = 24, fill = color.BlueGray[700].toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path d="M8 19L16 12.5L8 6L8 19Z" fill={fill} />
        </Svg>
    );
}
