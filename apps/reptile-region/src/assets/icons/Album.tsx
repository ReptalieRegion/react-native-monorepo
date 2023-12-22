import { color } from '@crawl/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Album({
    fill = color.White.toString(),
    height = 24,
    stroke = color.DarkGray[500].toString(),
    width = 24,
    strokeWidth = 1,
}: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 26 24" fill="none">
            <Path
                d="M17.5 9.75C18.6046 9.75 19.5 8.85457 19.5 7.75C19.5 6.64543 18.6046 5.75 17.5 5.75C16.3954 5.75 15.5 6.64543 15.5 7.75C15.5 8.85457 16.3954 9.75 17.5 9.75Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <Path
                d="M1 16V1H25V16M1 16V22H25V16M1 16L9.57143 10L18.1429 16L21.5714 13L25 16"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
