import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { CreatePostRequest, SharePostListData, SharePostListInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

type UseCreatePostProps = {
    onSuccess?: () => void;
};

const useCreatePost = ({ onSuccess }: UseCreatePostProps) => {
    const queryClient = useQueryClient();

    return useMutation<SharePostListData, any, CreatePostRequest>({
        mutationFn: ({ contents, files }) => createPost({ contents, files }),
        onSuccess: (data) => {
            queryClient.setQueryData<InfiniteData<SharePostListInfiniteData>>(sharePostQueryKeys.list, (oldData) => {
                if (oldData === undefined) {
                    return oldData;
                }

                const updatePages = [...oldData.pages];
                updatePages[0] = {
                    ...updatePages[0],
                    items: [data, ...updatePages[0].items],
                };

                return {
                    ...oldData,
                    pages: updatePages,
                };
            });
            onSuccess?.();
        },
        onError: (error) => {
            console.log(error);
        },
    });
};

export default useCreatePost;
