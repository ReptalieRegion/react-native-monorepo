import { color } from '@crawl/design-system';
import React from 'react';
import { Circle, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Meatballs({ height = 24, width = 24, fill = color.Black.toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Circle cx="5.6" cy="12" r="1.2" transform="rotate(-90 5.6 12)" fill={fill} />
            <Circle cx="11.6" cy="12" r="1.2" transform="rotate(-90 11.6 12)" fill={fill} />
            <Circle cx="17.6" cy="12" r="1.2" transform="rotate(-90 17.6 12)" fill={fill} />
        </Svg>
    );
}
