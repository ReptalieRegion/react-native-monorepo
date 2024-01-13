import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import useBaseUpdateFollow from '@/apis/share-post/user/hooks/mutations/useBaseUpdateFollow';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchPost } from '@/types/apis/share-post/post';
import type { UpdateFollowRequest } from '@/types/apis/share-post/user';

type Context = {
    prevPost: FetchPost['Response'] | undefined;
};

export default function useUpdateFollow({ queryKey }: { queryKey: CustomQueryKey }) {
    const queryClient = useQueryClient();

    return useBaseUpdateFollow<Context>({
        onMutate: useCallback(async () => {
            await queryClient.cancelQueries({ queryKey });
            const prevPost = queryClient.getQueryData<FetchPost['Response']>(queryKey);
            queryClient.setQueryData<FetchPost['Response']>(queryKey, (prevData) => {
                if (prevData === undefined) {
                    return prevData;
                }

                return {
                    post: {
                        ...prevData.post,
                        user: {
                            ...prevData.post.user,
                            isFollow: !prevData.post.user.isFollow,
                        },
                    },
                };
            });

            return { prevPost };
        }, [queryClient, queryKey]),
        onError: useCallback(
            (_error: HTTPError, _variables: UpdateFollowRequest, context: Context | undefined) => {
                if (context?.prevPost) {
                    queryClient.setQueryData<FetchPost['Response']>(queryKey, context.prevPost);
                }
            },
            [queryClient, queryKey],
        ),
    });
}
