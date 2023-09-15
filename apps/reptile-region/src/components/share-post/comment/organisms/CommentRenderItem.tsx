import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentAvatar from '../atoms/CommentAvatar';
import CommentReplyButton from '../atoms/CommentReplyButton';
import CommentContents from '../molecules/CommentContents';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';
import useUpdateComment from '@/apis/share-post/comment/hooks/mutations/useUpdateComment';

type RenderItemProps = {
    user: SharePostCommentData['user'];
    comment: SharePostCommentData['comment'];
    FootChildren?: ReactNode;
};

const CommentRenderItem = ({ user, comment }: RenderItemProps) => {
    const { mutate: updateCommentMutate } = useUpdateComment();
    const { mutate: deleteCommentMutate } = useDeleteComment();

    const handleDeleteComment = () => {
        deleteCommentMutate({ commentId: comment.id });
    };

    const handleUpdateComment = () => {
        updateCommentMutate({ commentId: comment.id, contents: comment.contents });
    };

    return (
        <View style={styles.container}>
            <CommentAvatar uri={user.profile.src} nickname={user.nickname} />
            <View style={styles.commentItemContent}>
                <CommentContents
                    comment={{ contents: comment.contents, id: comment.id, isMine: comment.isMine }}
                    user={{ nickname: user.nickname }}
                    updateComment={handleUpdateComment}
                    deleteComment={handleDeleteComment}
                />
                <CommentReplyButton comment={comment} user={user} replyCount={comment.replyCount} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10,
    },
    commentItemContent: {
        flex: 1,
    },
});

export default CommentRenderItem;
