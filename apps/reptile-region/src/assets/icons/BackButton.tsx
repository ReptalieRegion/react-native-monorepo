import { color } from '@reptile-region/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

const BackButton = ({ width = 15, height = 15, fill = color.DarkGray[500].toString() }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
            <Path
                d="M17.6614 24.5152C17.4746 24.5159 17.2901 24.4747 17.1214 24.3946C16.9527 24.3146 16.804 24.1978 16.6864 24.0527L10.6489 16.5527C10.465 16.3291 10.3645 16.0485 10.3645 15.759C10.3645 15.4695 10.465 15.1889 10.6489 14.9652L16.8989 7.46524C17.111 7.20997 17.4159 7.04944 17.7465 7.01896C18.077 6.98849 18.4061 7.09056 18.6614 7.30274C18.9166 7.51491 19.0772 7.8198 19.1076 8.15033C19.1381 8.48087 19.036 8.80997 18.8239 9.06524L13.2364 15.7652L18.6364 22.4652C18.7892 22.6487 18.8863 22.8721 18.9162 23.1091C18.946 23.346 18.9074 23.5865 18.8048 23.8022C18.7022 24.0179 18.54 24.1996 18.3374 24.326C18.1347 24.4524 17.9002 24.518 17.6614 24.5152Z"
                fill={fill}
            />
        </Svg>
    );
};

export default BackButton;
