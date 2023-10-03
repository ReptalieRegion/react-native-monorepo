import { useRoute } from '@react-navigation/native';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTagHandler } from 'tag-text-input';

import { ActionButton } from '../atoms/CommentActions';
import CommentContents from '../molecules/CommentContents';

import type { FetchCommentReplyResponse } from '<api/share/post/comment-reply>';
import type { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import { Avatar } from '@/components/@common/atoms';
import useCommentNavigation from '@/hooks/navigation/useCommentNavigation';
import useCommentStore from '@/stores/share-post/useCommentStore';

type RenderItemProps = {
    items: FetchCommentReplyResponse;
};

const CommentReplyRenderItem = ({ items }: RenderItemProps) => {
    const { navigationModalDetail } = useCommentNavigation();
    const { mutate } = useDeleteCommentReply();
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    console.log(params);

    const setCommentRegisterType = useCommentStore((state) => state.setCommentRegisterType);
    const { changeText, tagTextInputFocus } = useTagHandler();

    const deleteComment = useCallback(() => mutate({ commentReplyId: items.commentReply.id }), [items.commentReply.id, mutate]);

    const updateComment = useCallback(() => {
        const contents = items.commentReply.contents + ' ';
        tagTextInputFocus();
        changeText(contents);
        setCommentRegisterType({
            commentType: 'commentReply',
            key: params.comment.id,
            type: 'update',
            id: items.commentReply.id,
        });
    }, [
        params.comment.id,
        items.commentReply.contents,
        items.commentReply.id,
        tagTextInputFocus,
        changeText,
        setCommentRegisterType,
    ]);

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
                recyclingKey={items.commentReply.user.profile.src}
                onPress={() => navigationModalDetail(items.commentReply.user.nickname)}
                source={{ uri: items.commentReply.user.profile.src }}
                priority={'high'}
                contentFit="cover"
                placeholderContentFit="cover"
                placeholder={require('@/assets/images/avatar.png')}
            />
            <View style={styles.commentItemContent}>
                <CommentContents
                    comment={{
                        contents: items.commentReply.contents,
                        id: items.commentReply.id,
                        isMine: items.commentReply.isMine,
                        isModified: items.commentReply.isModified,
                    }}
                    user={{ nickname: items.commentReply.user.nickname }}
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
