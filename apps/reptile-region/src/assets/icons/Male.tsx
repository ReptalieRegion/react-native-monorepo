import { color } from '@reptile-region/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Male({ width = 24, height = 24 }: IconProps) {
    return (
        <Svg height={height} viewBox="0 -960 960 960" width={width}>
            <Path
                d="M800-760v160q0 17-11.5 28.5T760-560q-17 0-28.5-11.5T720-600v-63L561-505q19 28 29 59.5t10 65.5q0 92-64 156t-156 64q-92 0-156-64t-64-156q0-92 64-156t156-64q33 0 65 9.5t59 29.5l159-159h-63q-17 0-28.5-11.5T560-760q0-17 11.5-28.5T600-800h160q17 0 28.5 11.5T800-760ZM380-520q-58 0-99 41t-41 99q0 58 41 99t99 41q58 0 99-41t41-99q0-58-41-99t-99-41Z"
                fill={color.Blue[500].toString()}
            />
        </Svg>
    );
}
