import { color } from '@reptile-region/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '<Icon>';

const Comment = ({ stroke = color.Black.toString() }: IconProps) => {
    return (
        <Svg width="40" height="40" viewBox="0 0 24 24" fill="none">
            <Path
                d="M6.07897 14.0864C4.49418 12.5256 4.77001 10 6.07897 8.60741C8.99985 5.49992 15.386 5.07831 18.0712 8.60741C19.4571 10.4289 19.1527 12.1809 18.0712 14.0864C17.0532 15.8801 14.3058 18 14.3058 18L14.6492 14.6687C14.6492 14.6687 8.27572 16.25 6.07897 14.0864Z"
                fill={color.White.toString()}
                stroke={stroke}
                strokeWidth="1"
            />
        </Svg>
    );
};

export default Comment;
