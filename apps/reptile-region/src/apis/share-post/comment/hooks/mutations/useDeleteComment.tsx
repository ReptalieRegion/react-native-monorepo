import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteComment } from '../../repository';

import type { DeleteCommentRequest, DeleteCommentResponse, SharePostCommentInfiniteData } from '<SharePostCommentAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const deleteCommentCache = ({ queryClient, data }: { queryClient: QueryClient; data: DeleteCommentResponse }) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentInfiniteData>>(
        sharePostQueryKeys.comment(data.post.id),
        (prevComments) => {
            if (prevComments === undefined) {
                return prevComments;
            }

            const updatePages = [...prevComments.pages].map((page) => {
                const items = page.items.filter((item) => item.comment.id !== data.comment.id);

                return { ...page, items };
            });

            return {
                ...prevComments,
                pages: updatePages,
            };
        },
    );
};

const useDeleteComment = () => {
    const queryClient = useQueryClient();
    return useMutation<DeleteCommentResponse, any, DeleteCommentRequest>({
        mutationFn: ({ commentId }) => deleteComment({ commentId }),
        onSuccess: (data) => {
            deleteCommentCache({ queryClient, data });
        },
    });
};

export default useDeleteComment;
