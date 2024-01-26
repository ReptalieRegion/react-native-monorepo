import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import useBaseUpdateLike from '@/apis/share-post/post/hooks/mutations/useBaseUpdateLike';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchPost, UpdateLikeRequest } from '@/types/apis/share-post/post';

type Context = {
    prevPost: FetchPost['Response'] | undefined;
};

export default function useUpdateLike({ queryKey }: { queryKey: CustomQueryKey }) {
    const queryClient = useQueryClient();

    return useBaseUpdateLike<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey });
            const prevPost = queryClient.getQueryData<FetchPost['Response']>(queryKey);
            queryClient.setQueryData<FetchPost['Response']>(queryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                const { isLike, likeCount } = prevData.post;

                return {
                    post: {
                        ...prevData.post,
                        isLike: !isLike,
                        likeCount: isLike ? likeCount - 1 : likeCount + 1,
                    },
                };
            });

            return { prevPost };
        }, [queryClient, queryKey]),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateLikeRequest, context: Context | undefined) => {
                if (context?.prevPost) {
                    queryClient.setQueryData<FetchPost['Response']>(queryKey, context.prevPost);
                }
            },
            [queryClient, queryKey],
        ),
    });
}
