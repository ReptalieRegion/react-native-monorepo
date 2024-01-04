import { useCallback } from 'react';
import { Keyboard } from 'react-native';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import useBaseCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useBaseCreateCommentReply';
import useToast from '@/components/overlay/Toast/useToast';
import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';

export default function useCreateCommentReply(postId: string) {
    const { changeText } = useTagHandler();
    const openToast = useToast();

    return useBaseCreateCommentReply({
        onSuccess: useCallback(() => {
            setTimeout(Keyboard.dismiss, 500);
            changeText('');
        }, [changeText]),
        onError: useCallback(
            (error: HTTPError) => {
                console.log(postId);
                if (error.code === -2302) {
                    openToast({ contents: '현재 댓글은 삭제되었어요', severity: 'error' });
                } else {
                    openToast({ contents: '댓글 등록에 실패했어요', severity: 'error' });
                }
            },
            [openToast, postId],
        ),
    });
}
