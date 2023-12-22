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
        <Svg width={width} height={height} viewBox="0 0 26 26" fill="none">
            <Path
                d="M17.7143 10.9286C18.9372 10.9286 19.9286 9.9372 19.9286 8.71429C19.9286 7.49137 18.9372 6.5 17.7143 6.5C16.4914 6.5 15.5 7.49137 15.5 8.71429C15.5 9.9372 16.4914 10.9286 17.7143 10.9286Z"
                fill={fill}
                stroke={stroke}
                strokeWidth={strokeWidth}
            />
            <Path
                d="M1 18.1429V1H25V18.1429M1 18.1429V25H25V18.1429M1 18.1429L9.57143 11.2857L18.1429 18.1429L21.5714 14.7143L25 18.1429"
                stroke={stroke}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    );
}
