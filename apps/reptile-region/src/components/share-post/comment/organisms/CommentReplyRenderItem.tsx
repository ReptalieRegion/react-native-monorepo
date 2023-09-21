import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTagHandler } from 'tag-text-input';

import { ActionButton } from '../atoms/CommentActions';
import CommentContents from '../molecules/CommentContents';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import Avatar from '@/components/common/fast-image/Avatar';
import useCommentNavigation from '@/hooks/navigation/useCommentNavigation';
import useCommentStore from '@/stores/share-post/useCommentStore';

type RenderItemProps = {
    user: SharePostCommentReplyData['user'];
    commentReply: SharePostCommentReplyData['commentReply'];
};

const CommentReplyRenderItem = ({ user, commentReply }: RenderItemProps) => {
    const { navigationModalDetail } = useCommentNavigation();
    const { mutate } = useDeleteCommentReply();
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();

    const setCommentRegisterType = useCommentStore((state) => state.setCommentRegisterType);
    const { changeText, tagTextInputFocus } = useTagHandler();

    const deleteComment = useCallback(() => mutate({ commentReplyId: commentReply.id }), [commentReply.id, mutate]);

    const updateComment = useCallback(() => {
        const contents = commentReply.contents + ' ';
        tagTextInputFocus();
        changeText(contents);
        setCommentRegisterType({ commentType: 'commentReply', key: params.comment.id, type: 'update', id: commentReply.id });
    }, [commentReply.contents, commentReply.id, tagTextInputFocus, changeText, setCommentRegisterType, params.comment.id]);

    const actionButtons: ActionButton[] = useMemo(
        () => [
            {
                label: '수정',
                showTarget: 'owner',
                onPress: updateComment,
            },
            {
                label: '삭제',
                showTarget: 'owner',
                onPress: deleteComment,
            },
            {
                label: '댓글 쓰기',
                showTarget: 'other',
            },
            {
                label: '신고',
                showTarget: 'other',
            },
        ],
        [deleteComment, updateComment],
    );

    return (
        <View style={styles.container}>
            <Avatar
                recyclingKey={user.profile.src}
                onPress={() => navigationModalDetail(user.nickname)}
                source={{ uri: user.profile.src }}
                priority={'high'}
                contentFit="cover"
                placeholderContentFit="cover"
                placeholder={require('@/assets/images/avatar.png')}
            />
            <View style={styles.commentItemContent}>
                <CommentContents
                    comment={{
                        contents: commentReply.contents,
                        id: commentReply.id,
                        isMine: commentReply.isMine,
                        isModified: commentReply.isModified,
                    }}
                    user={{ nickname: user.nickname }}
                    actionButtons={actionButtons}
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
