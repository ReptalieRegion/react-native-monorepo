import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { updateLike } from '../../repository';

import type { SharePostListInfiniteData, UpdateLikeRequest } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useUpdateLike = ({ postId }: UpdateLikeRequest) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => updateLike({ postId }),
        onSuccess: () => {
            queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (oldData) => {
                if (oldData === undefined) {
                    return oldData;
                }

                const updatePages = [...oldData.pages].map((page) => {
                    const items = page.items.map((item) => {
                        if (item.post.id === postId) {
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
        },
    });
};

export default useUpdateLike;
