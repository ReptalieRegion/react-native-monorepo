import { color } from '@reptile-region/design-system';
import React from 'react';

import type { IconProps } from '<Icon>';
import { Like_40 as Like } from '@/assets/icons';

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
        stroke: color.Black.toString(),
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
