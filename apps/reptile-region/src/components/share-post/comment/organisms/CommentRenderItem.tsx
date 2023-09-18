import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentAvatar from '../atoms/CommentAvatar';
import CommentReplyButton from '../atoms/CommentReplyButton';
import CommentContents from '../molecules/CommentContents';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';
import useTagAction from '@/hooks/useTagAction';

type RenderItemProps = {
    user: SharePostCommentData['user'];
    comment: SharePostCommentData['comment'];
    FootChildren?: ReactNode;
};

const CommentRenderItem = ({ user, comment }: RenderItemProps) => {
    const { handleChangeText } = useTagAction();
    const { mutate: deleteCommentMutate } = useDeleteComment();

    const handleDeleteComment = () => {
        deleteCommentMutate({ commentId: comment.id });
    };

    const handleUpdateComment = () => {
        handleChangeText(comment.contents);
    };

    return (
        <View style={styles.container}>
            <CommentAvatar uri={user.profile.src} nickname={user.nickname} />
            <View style={styles.commentItemContent}>
                <CommentContents
                    comment={{
                        contents: comment.contents,
                        id: comment.id,
                        isMine: comment.isMine,
                        isModified: comment.isModified,
                    }}
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
