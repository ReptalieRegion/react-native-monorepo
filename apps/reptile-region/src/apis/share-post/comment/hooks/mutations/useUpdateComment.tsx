import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type { SharePostCommentInfiniteData, UpdateCommentRequest, UpdateCommentResponse } from '<SharePostCommentAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const updateShareCommentListCache = ({ queryClient, data }: { queryClient: QueryClient; data: UpdateCommentResponse }) => {
    queryClient.setQueryData<InfiniteData<SharePostCommentInfiniteData>>(
        sharePostQueryKeys.comment(data.post.id),
        (prevCommentList) => {
            if (prevCommentList === undefined) {
                return prevCommentList;
            }

            const updatePages = [...prevCommentList.pages].map((page) => {
                const items = page.items.map((item) => {
                    if (item.comment.id === data.comment.id) {
                        return {
                            ...item,
                            comment: {
                                ...item.comment,
                                contents: data.comment.contents,
                                isModified: true,
                            },
                        };
                    }

                    return item;
                });

                return {
                    ...page,
                    items,
                };
            });

            return {
                ...prevCommentList,
                pages: updatePages,
            };
        },
    );
};

const useUpdateComment = () => {
    const queryClient = useQueryClient();
    return useMutation<UpdateCommentResponse, any, UpdateCommentRequest>({
        mutationFn: ({ commentId, contents }) => updateComment({ commentId, contents }),
        onSuccess: (data) => {
            updateShareCommentListCache({ queryClient, data });
        },
    });
};

export default useUpdateComment;
