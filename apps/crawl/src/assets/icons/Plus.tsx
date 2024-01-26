import { color } from '@crawl/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Plus({ width = 24, height = 24, fill = color.DarkGray[500].toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M14 10V4C14 2.89543 13.1046 2 12 2C10.8954 2 10 2.89543 10 4V10H4C2.89543 10 2 10.8954 2 12C2 13.1046 2.89543 14 4 14H10V20C10 21.1046 10.8954 22 12 22C13.1046 22 14 21.1046 14 20V14H20C21.1046 14 22 13.1046 22 12C22 10.8954 21.1046 10 20 10H14Z"
                fill={fill}
            />
        </Svg>
    );
}
