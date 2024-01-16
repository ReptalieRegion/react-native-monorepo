import { useCallback } from 'react';
import { Keyboard } from 'react-native';

import { SHARE_POST_ERROR_CODE } from '@/apis/@utils/error/code';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import useBaseCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useBaseCreateCommentReply';
import useToast from '@/components/overlay/Toast/useToast';
import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';

export default function useCreateCommentReply() {
    const { changeText } = useTagHandler();
    const openToast = useToast();

    return useBaseCreateCommentReply({
        onSuccess: useCallback(() => {
            setTimeout(Keyboard.dismiss, 500);
            changeText('');
        }, [changeText]),
        onError: useCallback(
            (error: HTTPError) => {
                if (error.code === SHARE_POST_ERROR_CODE.NOT_FOUND_COMMENT) {
                    openToast({ contents: '현재 댓글은 삭제되었어요', severity: 'error' });
                } else {
                    openToast({ contents: '댓글 등록에 실패했어요', severity: 'error' });
                }
            },
            [openToast],
        ),
    });
}
