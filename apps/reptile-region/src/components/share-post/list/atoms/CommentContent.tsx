import { TouchableTypo } from 'design-system';
import React from 'react';

import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';

type CommentContentProps = {
    commentCount: number;
    onPress: () => void;
};

export default function CommentContent({ commentCount, onPress }: CommentContentProps) {
    return (
        <ConditionalRenderer
            condition={commentCount === 0}
            trueContent={null}
            falseContent={
                <TouchableTypo variant="body2" color="placeholder" onPress={onPress}>
                    댓글 {commentCount}개 모두 보기
                </TouchableTypo>
            }
        />
    );
}
