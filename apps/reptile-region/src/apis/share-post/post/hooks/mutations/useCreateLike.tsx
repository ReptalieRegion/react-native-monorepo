import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type { CreateLikeRequest, CreateLikeResponse, SharePostListInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: CreateLikeResponse }) => {
    queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (oldData) => {
        if (oldData === undefined) {
            return oldData;
        }

        const updatePages = [...oldData.pages].map((page) => {
            const items = page.items.map((item) => {
                if (item.post.id === data.post.id) {
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
};

const useCreateLike = () => {
    const queryClient = useQueryClient();

    return useMutation<CreateLikeResponse, any, CreateLikeRequest>({
        mutationFn: ({ postId }) => createLike({ postId }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
        },
    });
};

export default useCreateLike;
