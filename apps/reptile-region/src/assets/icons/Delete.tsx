import { color } from '@crawl/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

export default function Delete({ width = 24, height = 24, fill = color.Gray[500].toString() }: IconProps) {
    return (
        <Svg width={width} height={height} viewBox="0 0 24 24" fill="none">
            <Path
                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z"
                fill={fill}
            />
        </Svg>
    );
}
