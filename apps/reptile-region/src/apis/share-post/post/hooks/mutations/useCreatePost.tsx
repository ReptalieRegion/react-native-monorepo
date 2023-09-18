import { InfiniteData, QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { CreatePostRequest, CreatePostResponse, SharePostListInfiniteData } from '<SharePostAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

type UseCreatePostProps = {
    onSuccess: () => void;
};

const updateSharePostListCache = ({ queryClient, data }: { queryClient: QueryClient; data: CreatePostResponse }) => {
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
};

const useCreatePost = ({ onSuccess }: UseCreatePostProps) => {
    const queryClient = useQueryClient();

    return useMutation<CreatePostResponse, any, CreatePostRequest>({
        mutationFn: ({ contents, selectedPhotos }) => createPost({ contents, selectedPhotos }),
        onSuccess: (data) => {
            updateSharePostListCache({ queryClient, data });
            onSuccess();
        },
    });
};

export default useCreatePost;
