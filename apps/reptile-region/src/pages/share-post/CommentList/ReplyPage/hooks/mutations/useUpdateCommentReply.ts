import { QueryClient, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Keyboard } from 'react-native';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useBaseUpdateCommentReply';
import useToast from '@/components/overlay/Toast/useToast';
import useCommentHandler from '@/pages/share-post/@common/contexts/Comment/hooks/useCommentHandler';
import { useTagHandler } from '@/pages/share-post/@common/contexts/TagTextInput';
import type { FetchCommentReply, UpdateCommentReplyResponse } from '@/types/apis/share-post/comment-reply';

export default function useUpdateCommentReply() {
    const queryClient = useQueryClient();
    const openToast = useToast();
    const { changeText } = useTagHandler();
    const { changeCommentSubmitType } = useCommentHandler();

    return useBaseUpdateCommentReply({
        onSuccess: useCallback(
            (data: UpdateCommentReplyResponse) => {
                setTimeout(Keyboard.dismiss, 500);
                changeText('');
                changeCommentSubmitType({ id: data.comment.id, submitType: 'CREATE' });
                updateCommentReplyList({ queryClient, data });
            },
            [changeCommentSubmitType, changeText, queryClient],
        ),
        onError: useCallback(() => {
            openToast({ contents: '댓글 수정에 실패했어요.', severity: 'error' });
        }, [openToast]),
    });
}

// 대댓글 리스트 무한스크롤 대댓글 수정
function updateCommentReplyList({ queryClient, data }: { queryClient: QueryClient; data: UpdateCommentReplyResponse }) {
    const queryKey = SHARE_POST_QUERY_KEYS.commentReply(data.comment.id);

    queryClient.setQueryData<InfiniteData<FetchCommentReply['Response']>>(queryKey, (prevCommentReplyList) => {
        if (prevCommentReplyList === undefined) {
            return prevCommentReplyList;
        }

        const { pageParams, pages } = prevCommentReplyList;
        const updatePages = [...pages].map((page) => {
            const { nextPage, items } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetCommentReply = item.commentReply.id === data.comment.commentReply.id;
                    return isTargetCommentReply
                        ? { commentReply: { ...item.commentReply, ...data.comment.commentReply, isModified: true } }
                        : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
