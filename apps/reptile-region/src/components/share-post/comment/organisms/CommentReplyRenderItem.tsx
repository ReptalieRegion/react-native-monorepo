import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentAvatar from '../atoms/CommentAvatar';
import CommentContents from '../molecules/CommentContents';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';
import useUpdateComment from '@/apis/share-post/comment/hooks/mutations/useUpdateComment';

type RenderItemProps = {
    user: SharePostCommentReplyData['user'];
    comment: SharePostCommentReplyData['comment'];
    FootChildren?: ReactNode;
};

const CommentReplyRenderItem = ({ user, comment }: RenderItemProps) => {
    /** @TODO CommentReply로 변경 */
    const { mutate: updateCommentReplyMutate } = useUpdateComment();
    const { mutate: deleteCommentReplyMutate } = useDeleteComment();

    const handleDeleteComment = () => {
        deleteCommentReplyMutate({ commentId: comment.id });
    };

    const handleUpdateComment = () => {
        updateCommentReplyMutate({ commentId: comment.id, contents: comment.contents });
    };

    return (
        <View style={styles.container}>
            <CommentAvatar uri={user.profile.src} nickname={user.nickname} />
            <View style={styles.commentItemContent}>
                <CommentContents
                    comment={{ contents: comment.contents, id: comment.id, isMine: comment.isMine }}
                    user={{ nickname: user.nickname }}
                    deleteComment={handleDeleteComment}
                    updateComment={handleUpdateComment}
                />
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

export default CommentReplyRenderItem;
