import { color } from '@reptile-region/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Diary({ fill = color.Green[750].toString() }: IconProps) {
    return (
        <Svg width="22" height="26" viewBox="0 0 22 26" fill="none">
            <Path d="M1 21.129V1H16.0723V12.3938V21.129H1Z" fill={color.White.toString()} />
            <Path
                d="M1 1V0.5H0.5V1H1ZM1 21.129H0.5V21.629H1V21.129ZM16.0723 21.129V21.629C16.3484 21.629 16.5723 21.4052 16.5723 21.129H16.0723ZM16.0723 1H16.5723C16.5723 0.723858 16.3484 0.5 16.0723 0.5V1ZM0.5 1V21.129H1.5V1H0.5ZM1 21.629H16.0723V20.629H1V21.629ZM16.5723 21.129V12.3938H15.5723V21.129H16.5723ZM16.5723 12.3938V1H15.5723V12.3938H16.5723ZM16.0723 0.5H1V1.5H16.0723V0.5Z"
                fill="black"
            />
            <Path
                d="M1 22.6776V21.1293H16.1979V1.77441H17.5795V22.6776H1Z"
                fill={color.White.toString()}
                stroke="black"
                stroke-linejoin="round"
            />
            <Path
                d="M2.13037 24.9999V21.1289H5.14482V24.9999L3.6376 23.4515L2.13037 24.9999Z"
                fill={fill}
                stroke="black"
                stroke-linejoin="round"
            />
            <Path d="M2.50708 5.64533V3.32275H14.5649V5.64533H2.50708Z" fill={fill} stroke="black" stroke-linejoin="round" />
            <Path
                d="M17.986 21.2875L12.9355 6.69873L15.0657 5.92047L20.1162 20.5092L17.986 21.2875Z"
                fill={fill}
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M15.0656 5.92033L12.9355 6.69859L13.3693 4.48587L15.0656 5.92033Z"
                fill="white"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M18.3649 22.3818L17.9861 21.2876L20.1162 20.5093L20.495 21.6035L20.495 21.6035C20.7475 22.3329 21.0001 23.0624 20.645 23.1921L19.2249 23.7109C18.8699 23.8406 18.6174 23.1112 18.3649 22.3818Z"
                fill="white"
            />
            <Path
                d="M18.3649 22.3818L17.9861 21.2876L20.1162 20.5093L20.495 21.6035M18.3649 22.3818L20.495 21.6035M18.3649 22.3818C18.6174 23.1112 18.8699 23.8406 19.2249 23.7109C19.58 23.5812 20.29 23.3218 20.645 23.1921C21.0001 23.0624 20.7475 22.3329 20.495 21.6035"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
            <Path
                d="M3.08325 15.8001H14.7499M3.08325 13.0001H13.0833M3.08325 10.6001H15.1666"
                stroke="black"
                stroke-linecap="round"
                stroke-linejoin="round"
            />
        </Svg>
    );
}
