import type { InfiniteData } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchComment, UpdateComment } from '@/types/apis/share-post/comment';

interface UseUpdateCommentActions {
    onSuccess(): void;
}

type UseUpdateCommentProps = UseUpdateCommentActions;

export default function useUpdateComment({ onSuccess }: UseUpdateCommentProps) {
    const queryClient = useQueryClient();

    return useMutation<UpdateComment['Response'], HTTPError, UpdateComment['Request']>({
        mutationFn: ({ commentId, contents }) => updateComment({ commentId, contents }),
        onSuccess: (data) => {
            onSuccess();
            updateShareCommentListCache({ queryClient, data });
        },
    });
}

// 특정 게시글 댓글 리스트 무한 스크롤 댓글 수정
function updateShareCommentListCache({ queryClient, data }: { queryClient: QueryClient; data: UpdateComment['Response'] }) {
    const queryKey = SHARE_POST_QUERY_KEYS.comment(data.post.id);

    queryClient.setQueryData<InfiniteData<FetchComment['Response']>>(queryKey, (prevCommentList) => {
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
