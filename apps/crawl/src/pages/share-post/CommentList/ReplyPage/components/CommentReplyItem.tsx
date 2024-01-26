import React from 'react';

import type { CommentActionButtonsAction } from '../../../@common/contexts/Comment/components/ActionButtons';
import CommentActionButtons from '../../../@common/contexts/Comment/components/ActionButtons';

import { Avatar } from '@/components/@common/atoms';
import TaggedContents from '@/pages/share-post/@common/components/TaggedContents';
import CommentHeader from '@/pages/share-post/@common/contexts/Comment/components/CommentHeader';
import CommentTemplate from '@/pages/share-post/@common/contexts/Comment/components/CommentTemplate';
import type { FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';

type CommentListProps = {
    item: FetchCommentReplyResponse;
};

interface CommentListActions extends CommentActionButtonsAction {
    onPressNickname(nickname: string): void;
    onPressTag(nickname: string): void;
}

export default function CommentItem({
    item: {
        commentReply: {
            id: commentId,
            contents,
            isMine,
            isModified,
            createdAt,
            user: { nickname, profile },
        },
    },
    onPressNickname,
    onPressTag,
    onPressDeclarationButton,
    onPressDeleteButton,
    onPressUpdateButton,
    onPressWriteButton,
}: CommentListProps & CommentListActions) {
    const handlePressNickname = () => {
        onPressNickname(nickname);
    };

    const handlePressTag = (tag: string) => {
        onPressTag(tag);
    };

    return (
        <CommentTemplate
            imageComponent={
                <Avatar
                    recyclingKey={profile.src}
                    onPress={handlePressNickname}
                    image={{ src: profile.src }}
                    priority={'high'}
                    contentFit="cover"
                    placeholderContentFit="cover"
                    placeholder={require('@/assets/images/avatar.png')}
                />
            }
            contentComponent={
                <>
                    <CommentHeader
                        comment={{ createdAt, isModified, user: { nickname } }}
                        onPressNickname={handlePressNickname}
                    />
                    <TaggedContents uuid={commentId} contents={contents} onPressTag={handlePressTag} />
                    <CommentActionButtons
                        comment={{
                            id: commentId,
                            contents,
                            isMine,
                        }}
                        onPressWriteButton={onPressWriteButton}
                        onPressUpdateButton={onPressUpdateButton}
                        onPressDeleteButton={onPressDeleteButton}
                        onPressDeclarationButton={onPressDeclarationButton}
                    />
                </>
            }
        />
    );
}
