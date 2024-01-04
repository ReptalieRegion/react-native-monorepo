import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import useBaseDeleteComment from '@/apis/share-post/comment/hooks/mutations/useBaseDeleteComment';
import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import useAlert from '@/components/overlay/Alert/useAlert';
import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';
import type { CommentReplyNavigationProp } from '@/types/routes/props/share-post/comment';

export default function useCommentReplyActions() {
    const navigation = useNavigation<CommentReplyNavigationProp>();
    const { openLoading, closeLoading } = useGlobalLoading();
    const openAlert = useAlert();

    // 댓글 관련
    const deleteCommentAPI = useBaseDeleteComment({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: () => {
            navigation.goBack();
        },
    });
    const deleteComment = useCallback(
        (commentId: string) => {
            openAlert({
                contents: '정말로 삭제하시겠어요?',
                buttons: [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    {
                        text: '삭제',
                        onPress: () => deleteCommentAPI.mutate({ commentId }),
                    },
                ],
            });
        },
        [deleteCommentAPI, openAlert],
    );

    // 대댓글 관련
    const deleteCommentReplyAPI = useDeleteCommentReply();
    const deleteCommentReply = useCallback(
        (commentReplyId: string) => {
            openAlert({
                contents: '정말로 삭제하시겠어요?',
                buttons: [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    {
                        text: '삭제',
                        onPress: () => deleteCommentReplyAPI.mutate({ commentReplyId }),
                    },
                ],
            });
        },
        [deleteCommentReplyAPI, openAlert],
    );

    // 댓글 쓰기 버튼 클릭
    const { changeText, tagTextInputFocus } = useTagHandler();
    const handlePressWriteButton = useCallback(
        (nickname: string) => {
            changeText(`@${nickname} `);
            tagTextInputFocus();
        },
        [changeText, tagTextInputFocus],
    );

    return useMemo(
        () => ({
            deleteComment,
            deleteCommentReply,
            handlePressWriteButton,
        }),
        [deleteComment, deleteCommentReply, handlePressWriteButton],
    );
}
