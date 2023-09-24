import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type { FetchComment, UpdateComment } from '<api/share/post/comment>';
import { sharePostQueryKeys } from '@/apis/query-keys';

/** 특정 게시글 댓글 리스트 무한 스크롤 댓글 수정 */
const updateShareCommentListCache = ({ queryClient, data }: { queryClient: QueryClient; data: UpdateComment['Response'] }) => {
    const queryKey = sharePostQueryKeys.comment(data.post.id);

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
                    return isTargetComment ? { comment: { ...item.comment, ...data.post.comment } } : item;
                }),
            };
        });

        return {
            pageParams,
            pages: updatePages,
        };
    });
};

const useUpdateComment = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateComment['Response'], any, UpdateComment['Request']>({
        mutationFn: ({ commentId, contents }) => updateComment({ commentId, contents }),
        onSuccess: (data) => {
            updateShareCommentListCache({ queryClient, data });
        },
    });
};

export default useUpdateComment;
