import { Typo } from 'design-system';
import React from 'react';

import type { SharePostListData } from '<SharePostAPI>';

type LikeContentProps = {
    post: Pick<SharePostListData['post'], 'likeCount'>;
};

const LikeContent = ({ post }: LikeContentProps) => {
    if (post.likeCount === 0) {
        return null;
    }

    return <Typo variant="heading3">{post.likeCount}명이 좋아합니다.</Typo>;
};

export default LikeContent;
