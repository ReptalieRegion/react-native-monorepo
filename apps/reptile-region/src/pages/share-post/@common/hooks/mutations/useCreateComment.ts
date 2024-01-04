import { useCallback } from 'react';
import { Keyboard } from 'react-native';

import { useTagHandler } from '../../contexts/TagTextInput';

import useBaseCreateComment from '@/apis/share-post/comment/hooks/mutations/useBaseCreateComment';
import useToast from '@/components/overlay/Toast/useToast';

export default function useCreateComment() {
    const { changeText } = useTagHandler();
    const openToast = useToast();

    return useBaseCreateComment({
        onSuccess: useCallback(() => {
            setTimeout(Keyboard.dismiss, 500);
            changeText('');
        }, [changeText]),
        onError: useCallback(() => {
            openToast({ contents: '댓글 등록에 실패했어요.', severity: 'error' });
        }, [openToast]),
    });
}
