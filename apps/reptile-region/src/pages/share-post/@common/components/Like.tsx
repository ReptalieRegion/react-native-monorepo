import { color } from '@crawl/design-system';
import React from 'react';

import { Like_40 as Like } from '@/assets/icons';
import type { IconProps } from '@/types/global/icons';

export default function LikeIcon({ isLike }: { isLike: boolean | undefined }) {
    const likeIconStyle = generatedStyle(isLike);

    return <Like {...likeIconStyle} />;
}

function generatedStyle(isLike: boolean | undefined): IconProps {
    if (isLike) {
        return {
            fill: color.Red[500].toString(),
            stroke: color.Red[500].toString(),
        };
    }

    return {
        fill: color.White.toString(),
        stroke: color.DarkGray[500].toString(),
    };
}
