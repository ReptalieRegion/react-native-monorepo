import { color } from 'design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import { IconProps } from '<Icon>';

export default function Trash({ width = 24, height = 24, fill = color.Black.toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 25 25" fill="none">
            <Path
                d="M21.9258 6.62638H16.9258V4.95638C16.9023 4.3162 16.626 3.71144 16.1574 3.27467C15.6887 2.8379 15.066 2.60477 14.4258 2.62638H11.4258C10.7855 2.60477 10.1628 2.8379 9.69421 3.27467C9.22558 3.71144 8.94924 4.3162 8.92578 4.95638V6.62638H3.92578C3.66056 6.62638 3.40621 6.73174 3.21867 6.91927C3.03114 7.10681 2.92578 7.36116 2.92578 7.62638C2.92578 7.8916 3.03114 8.14595 3.21867 8.33349C3.40621 8.52102 3.66056 8.62638 3.92578 8.62638H4.92578V19.6264C4.92578 20.422 5.24185 21.1851 5.80446 21.7477C6.36707 22.3103 7.13013 22.6264 7.92578 22.6264H17.9258C18.7214 22.6264 19.4845 22.3103 20.0471 21.7477C20.6097 21.1851 20.9258 20.422 20.9258 19.6264V8.62638H21.9258C22.191 8.62638 22.4454 8.52102 22.6329 8.33349C22.8204 8.14595 22.9258 7.8916 22.9258 7.62638C22.9258 7.36116 22.8204 7.10681 22.6329 6.91927C22.4454 6.73174 22.191 6.62638 21.9258 6.62638ZM10.9258 4.95638C10.9258 4.79638 11.1358 4.62638 11.4258 4.62638H14.4258C14.7158 4.62638 14.9258 4.79638 14.9258 4.95638V6.62638H10.9258V4.95638Z"
                fill={fill}
            />
        </Svg>
    );
}
