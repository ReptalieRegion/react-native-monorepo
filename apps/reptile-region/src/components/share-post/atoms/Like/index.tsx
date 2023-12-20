import { color } from '@crawl/design-system';
import React from 'react';

import { Like_40 as Like } from '@/assets/icons';
import type { IconProps } from '@/types/global/icons';

type LikeProps = {
    isLike: boolean | undefined;
};

type LikeType = 'like' | 'unLike';

type LikeStyle = {
    [key in LikeType]: IconProps;
};

const LIKE_STYLE: LikeStyle = {
    like: {
        fill: color.Red[500].toString(),
        stroke: color.Red[500].toString(),
    },
    unLike: {
        fill: color.White.toString(),
        stroke: color.DarkGray[500].toString(),
    },
};

const makeLikeInfo = (isLike: boolean | undefined) => {
    const type: LikeType = isLike ? 'like' : 'unLike';
    return LIKE_STYLE[type];
};

export default function LikeIcon({ isLike }: LikeProps) {
    const likeIconStyle = makeLikeInfo(isLike);

    return <Like {...likeIconStyle} />;
}
