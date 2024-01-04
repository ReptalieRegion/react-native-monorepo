import { QueryClient, useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Keyboard } from 'react-native';

import useCommentHandler from '../../contexts/Comment/hooks/useCommentHandler';
import { useTagHandler } from '../../contexts/TagTextInput';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateComment from '@/apis/share-post/comment/hooks/mutations/useBaseUpdateComment';
import useToast from '@/components/overlay/Toast/useToast';
import type {
    FetchComment,
    FetchCommentResponse,
    UpdateCommentRequest,
    UpdateCommentResponse,
} from '@/types/apis/share-post/comment';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevComment: InfiniteData<InfiniteState<FetchCommentResponse[]>, number> | undefined;
};

export default function useUpdateComment() {
    const queryClient = useQueryClient();
    const openToast = useToast();
    const { changeText } = useTagHandler();
    const { changeCommentSubmitType } = useCommentHandler();

    return useBaseUpdateComment<Context>({
        onSuccess: useCallback(
            (data: UpdateCommentResponse) => {
                setTimeout(Keyboard.dismiss, 500);
                changeText('');
                changeCommentSubmitType({ id: data.post.id, submitType: 'CREATE' });
                updateCommentList({ queryClient, data });
            },
            [changeText, changeCommentSubmitType, queryClient],
        ),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateCommentRequest, _context: Context | undefined) => {
                openToast({ contents: '댓글 수정에 실패했어요', severity: 'error' });
            },
            [openToast],
        ),
    });
}

// 대댓글 리스트 무한스크롤 대댓글 수정
function updateCommentList({ queryClient, data }: { queryClient: QueryClient; data: UpdateCommentResponse }) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(data.post.id);
    queryClient.setQueryData<InfiniteData<FetchComment['Response'], number>>(queryKey, (prevCommentList) => {
        if (prevCommentList === undefined) {
            return prevCommentList;
        }

        const { pageParams, pages } = prevCommentList;

        const updatePages = [...pages].map((page) => {
            const { items, nextPage } = page;
            return {
                nextPage,
                items: items.map((item) => {
                    const isTargetComment = item.comment.id === data.post.comment.id;
                    return isTargetComment ? { comment: { ...item.comment, ...data.post.comment, isModified: true } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
}
