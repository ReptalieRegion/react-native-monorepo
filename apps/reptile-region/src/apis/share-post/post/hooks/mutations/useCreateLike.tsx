import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type { CreateLikeRequest, SharePostListInfiniteData } from '<SharePostAPI>';
import { postQueryKeys } from '@/apis/share-post/query-keys';

const useCreateLike = ({ postId }: CreateLikeRequest) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => createLike({ postId }),
        onSuccess: () => {
            queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(postQueryKeys.list, (oldData) => {
                if (oldData === undefined) {
                    return oldData;
                }

                const updatePages = [...oldData.pages].map((page) => {
                    const items = page.items.map((item) => {
                        if (item.post.id === postId) {
                            return {
                                ...item,
                                post: {
                                    ...item.post,
                                    isLike: true,
                                    likeCount: item.post.likeCount + 1,
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

export default useCreateLike;
