import { color } from '@crawl/design-system';
import React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function LeftArrow({ height = 24, width = 24, fill = color.BlueGray[700].toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path d="M16 6L8 12.5L16 19V6Z" fill={fill} />
        </Svg>
    );
}
