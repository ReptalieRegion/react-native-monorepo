import { useCallback } from 'react';
import { Alert, Keyboard } from 'react-native';

import { useTagHandler } from '../../contexts/TagTextInput';

import { SHARE_POST_ERROR_CODE } from '@/apis/@utils/error/code';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import useBaseCreateComment from '@/apis/share-post/comment/hooks/mutations/useBaseCreateComment';
import useToast from '@/components/overlay/Toast/useToast';
import { 이메일_1대1문의 } from '@/env/constants';

export default function useCreateComment() {
    const { changeText } = useTagHandler();
    const openToast = useToast();

    return useBaseCreateComment({
        onSuccess: useCallback(() => {
            setTimeout(Keyboard.dismiss, 500);
            changeText('');
        }, [changeText]),
        onError: useCallback(
            (error: HTTPError) => {
                if (error.code === SHARE_POST_ERROR_CODE.ACCUMULATED_REPORTS) {
                    Alert.alert('누적 신고 5회로 인해 댓글 생성이 차단되었어요', `${이메일_1대1문의}으로 문의해주세요.`);
                } else if (error.code === SHARE_POST_ERROR_CODE.NOT_FOUND_SHARE_POST) {
                    openToast({ contents: '현재 게시물은 삭제되었어요', severity: 'error' });
                } else {
                    openToast({ contents: '댓글 등록에 실패했어요', severity: 'error' });
                }
            },
            [openToast],
        ),
    });
}
