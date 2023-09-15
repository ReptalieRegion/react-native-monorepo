import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLike } from '../../repository';

import type { SharePostListInfiniteData, UpdateLikeRequest, UpdateLikeResponse } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: UpdateLikeResponse }) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (oldData) => {
        if (oldData === undefined) {
            return oldData;
        }

        const updatePages = [...oldData.pages].map((page) => {
            const items = page.items.map((item) => {
                if (item.post.id === data.post.id) {
                    const isLike = item.post.isLike;
                    const likeCount = item.post.likeCount;

                    return {
                        ...item,
                        post: {
                            ...item.post,
                            isLike: !isLike,
                            likeCount: isLike ? likeCount - 1 : likeCount + 1,
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
            ...oldData,
            pages: updatePages,
        };
    });
};

const useUpdateLike = () => {
    const queryClient = useQueryClient();

    return useMutation<UpdateLikeResponse, any, UpdateLikeRequest>({
        mutationFn: ({ postId }) => updateLike({ postId }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
        },
    });
};

export default useUpdateLike;
