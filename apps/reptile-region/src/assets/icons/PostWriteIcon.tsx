import { color } from '@crawl/design-system';
import React from 'react';
import { Path, Svg } from 'react-native-svg';

import type { IconProps } from '@/types/global/icons';

const PostWriteIcon = ({ width = 30, height = 30 }: IconProps) => {
    return (
        <Svg width={width} height={height} viewBox="0 0 30 30" fill="none">
            <Path
                d="M23.75 24.9995H6.25C5.91848 24.9995 5.60054 25.1312 5.36612 25.3656C5.1317 25.6 5 25.918 5 26.2495C5 26.581 5.1317 26.899 5.36612 27.1334C5.60054 27.3678 5.91848 27.4995 6.25 27.4995H23.75C24.0815 27.4995 24.3995 27.3678 24.6339 27.1334C24.8683 26.899 25 26.581 25 26.2495C25 25.918 24.8683 25.6 24.6339 25.3656C24.3995 25.1312 24.0815 24.9995 23.75 24.9995Z"
                fill={color.White.toString()}
            />
            <Path
                d="M6.25013 22.5001H6.36263L11.5751 22.0251C12.1461 21.9682 12.6802 21.7166 13.0876 21.3126L24.3376 10.0626C24.7743 9.60128 25.0103 8.9857 24.9939 8.35074C24.9774 7.71577 24.71 7.1132 24.2501 6.67507L20.8251 3.25007C20.3781 2.83019 19.7924 2.58927 19.1793 2.57313C18.5662 2.557 17.9686 2.76678 17.5001 3.16257L6.25013 14.4126C5.84608 14.82 5.59451 15.3541 5.53763 15.9251L5.00013 21.1376C4.98329 21.3207 5.00704 21.5052 5.0697 21.6781C5.13236 21.8509 5.23238 22.0078 5.36263 22.1376C5.47943 22.2534 5.61795 22.3451 5.77024 22.4073C5.92254 22.4695 6.08562 22.501 6.25013 22.5001ZM19.0876 5.00007L22.5001 8.41257L20.0001 10.8501L16.6501 7.50007L19.0876 5.00007ZM7.96263 16.1376L15.0001 9.15007L18.3751 12.5251L11.3751 19.5251L7.62513 19.8751L7.96263 16.1376Z"
                fill={color.White.toString()}
            />
        </Svg>
    );
};

export default PostWriteIcon;
