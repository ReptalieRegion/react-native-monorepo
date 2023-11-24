import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Camera({ width = 30, height = 27 }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 30 27" fill="none">
            <Path
                d="M3 21.7444V10.0292C3 8.73512 4.07452 7.6861 5.4 7.6861H6C6.75541 7.6861 7.46675 7.33887 7.92 6.74888L10.584 3.28117C10.72 3.10417 10.9334 3 11.16 3H18.84C19.0667 3 19.28 3.10417 19.416 3.28117L22.08 6.74888C22.5332 7.33887 23.2446 7.6861 24 7.6861H24.6C25.9255 7.6861 27 8.73512 27 10.0292V21.7444C27 23.0385 25.9255 24.0875 24.6 24.0875H5.4C4.07452 24.0875 3 23.0385 3 21.7444Z"
                fill="white"
                stroke="white"
                stroke-width="4.05965"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M15 19.7997C17.6509 19.7997 19.8 17.6506 19.8 14.9997C19.8 12.3488 17.6509 10.1997 15 10.1997C12.349 10.1997 10.2 12.3488 10.2 14.9997C10.2 17.6506 12.349 19.7997 15 19.7997Z"
                fill="#1E8B68"
            />
        </Svg>
    );
}
