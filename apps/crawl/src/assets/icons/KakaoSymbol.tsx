import React from 'react';
import Svg, { Path } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function KakaoSymbol({ height = 30, width = 30 }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M15 7C10.029 7 6 10.129 6 13.989C6 16.389 7.559 18.505 9.932 19.764L8.933 23.431C8.845 23.754 9.213 24.013 9.497 23.826L13.874 20.921C14.243 20.958 14.618 20.978 15 20.978C19.971 20.978 24 17.849 24 13.989C24 10.129 19.971 7 15 7Z"
                fill="black"
            />
        </Svg>
    );
}
