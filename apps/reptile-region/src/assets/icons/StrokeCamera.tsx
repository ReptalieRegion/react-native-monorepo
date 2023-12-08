import { color } from '@reptile-region/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function StrokeCamera({ width = 30, height = 27, stroke = color.Gray[500].toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 26 23" fill="none">
            <Path
                d="M1 19.7444V8.02915C1 6.73512 2.07452 5.6861 3.4 5.6861H4C4.75541 5.6861 5.46675 5.33887 5.92 4.74888L8.584 1.28117C8.71997 1.10417 8.93338 1 9.16 1H16.84C17.0667 1 17.28 1.10417 17.416 1.28117L20.08 4.74888C20.5332 5.33887 21.2446 5.6861 22 5.6861H22.6C23.9255 5.6861 25 6.73512 25 8.02915V19.7444C25 21.0385 23.9255 22.0875 22.6 22.0875H3.4C2.07452 22.0875 1 21.0385 1 19.7444Z"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M13 17.7998C15.6509 17.7998 17.8 15.6507 17.8 12.9998C17.8 10.3489 15.6509 8.19978 13 8.19978C10.3491 8.19978 8.20003 10.3489 8.20003 12.9998C8.20003 15.6507 10.3491 17.7998 13 17.7998Z"
                fill="white"
                stroke={stroke}
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
