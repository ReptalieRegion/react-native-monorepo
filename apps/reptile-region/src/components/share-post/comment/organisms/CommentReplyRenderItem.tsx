import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentAvatar from '../atoms/CommentAvatar';
import CommentContents from '../molecules/CommentContents';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import useUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useUpdateCommentReply';

type RenderItemProps = {
    user: SharePostCommentReplyData['user'];
    comment: SharePostCommentReplyData['comment'];
    FootChildren?: ReactNode;
};

const CommentReplyRenderItem = ({ user, comment }: RenderItemProps) => {
    const { mutate: updateCommentReplyMutate } = useUpdateCommentReply();
    const { mutate: deleteCommentReplyMutate } = useDeleteCommentReply();

    const handleDeleteComment = () => {
        deleteCommentReplyMutate({ commentReplyId: comment.id });
    };

    const handleUpdateComment = () => {
        updateCommentReplyMutate({ commentReplyId: comment.id, contents: comment.contents });
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
