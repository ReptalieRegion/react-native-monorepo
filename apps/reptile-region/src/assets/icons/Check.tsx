import { color } from '@crawl/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Check({ width = 24, height = 24, fill = color.DarkGray[500].toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M9.55 15.15L18.025 6.675C18.225 6.475 18.4625 6.375 18.7375 6.375C19.0125 6.375 19.25 6.475 19.45 6.675C19.65 6.875 19.75 7.1125 19.75 7.3875C19.75 7.6625 19.65 7.9 19.45 8.1L10.25 17.3C10.05 17.5 9.81667 17.6 9.55 17.6C9.28333 17.6 9.05 17.5 8.85 17.3L4.55 13C4.35 12.8 4.25417 12.5625 4.2625 12.2875C4.27083 12.0125 4.375 11.775 4.575 11.575C4.775 11.375 5.0125 11.275 5.2875 11.275C5.5625 11.275 5.8 11.375 6 11.575L9.55 15.15Z"
                fill={fill}
            />
        </Svg>
    );
}
