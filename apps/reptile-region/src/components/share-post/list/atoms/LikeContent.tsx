import { Typo } from 'design-system';
import React from 'react';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';

type LikeContentProps = {
    likeCount: number;
};

export default function LikeContent({ likeCount }: LikeContentProps) {
    return (
        <ConditionalRenderer
            condition={likeCount === 0}
            trueContent={null}
            falseContent={<Typo variant="heading3">{likeCount}명이 좋아합니다.</Typo>}
        />
    );
}
