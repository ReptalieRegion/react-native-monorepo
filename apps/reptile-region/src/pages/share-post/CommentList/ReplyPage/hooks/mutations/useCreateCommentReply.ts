import { useCallback } from 'react';
import { Keyboard } from 'react-native';

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
        onError: useCallback(() => {
            openToast({ contents: '댓글 등록에 실패했어요.', severity: 'error' });
        }, [openToast]),
    });
}
