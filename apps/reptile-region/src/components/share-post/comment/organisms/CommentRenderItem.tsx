import { useNavigation, useRoute } from '@react-navigation/native';
import { TouchableTypo } from 'design-system';
import React, { useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { useTagHandler } from 'tag-text-input';

import { ActionButton } from '../atoms/CommentActions';
import CommentContents from '../molecules/CommentContents';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentBottomSheetNavigationProp, SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';
import ConditionalRenderer from '@/components/common/element/ConditionalRenderer';
import Avatar from '@/components/common/fast-image/Avatar';
import useCommentNavigation from '@/hooks/navigation/useCommentNavigation';
import useCommentStore from '@/stores/share-post/useCommentStore';

type RenderItemProps = {
    user: SharePostCommentData['user'];
    comment: SharePostCommentData['comment'];
};

const CommentRenderItem = ({ user, comment }: RenderItemProps) => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'main'>>();
    const navigation = useNavigation<SharePostCommentBottomSheetNavigationProp<'main'>>();
    const { navigationModalDetail } = useCommentNavigation();
    const { mutate } = useDeleteComment();
    const setCommentRegisterType = useCommentStore((state) => state.setCommentRegisterType);
    const { changeText, tagTextInputFocus } = useTagHandler();

    const navigateCommentReply = useCallback(
        (commentingActive: boolean) => navigation.navigate('reply', { comment, user, commentingActive }),
        [navigation, comment, user],
    );
    const deleteComment = useCallback(() => mutate({ commentId: comment.id }), [comment.id, mutate]);
    const updateComment = useCallback(() => {
        tagTextInputFocus();
        changeText(comment.contents);
        setCommentRegisterType({ commentType: 'comment', key: params.post.id, type: 'update', id: comment.id });
    }, [comment.contents, comment.id, params.post.id, changeText, setCommentRegisterType, tagTextInputFocus]);

    const writeCommentReply = useCallback(() => {
        navigateCommentReply(true);
    }, [navigateCommentReply]);

    const actionButtons = useMemo<ActionButton[]>(
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
                onPress: writeCommentReply,
            },
            {
                label: '신고',
                showTarget: 'other',
            },
        ],
        [deleteComment, updateComment, writeCommentReply],
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
                        contents: comment.contents,
                        id: comment.id,
                        isMine: comment.isMine,
                        isModified: comment.isModified,
                    }}
                    user={{ nickname: user.nickname }}
                    actionButtons={actionButtons}
                />
                <ConditionalRenderer
                    condition={comment.replyCount !== 0}
                    trueContent={
                        <View style={styles.container}>
                            <TouchableTypo variant="body4" color="secondary" onPress={() => navigateCommentReply(false)}>
                                답글 {comment.replyCount}개보기
                            </TouchableTypo>
                        </View>
                    }
                    falseContent={null}
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

export default CommentRenderItem;
