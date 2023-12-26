import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import useBaseCreateFollow from '@/apis/share-post/user/hooks/mutations/useBaseCreateFollow';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchPost } from '@/types/apis/share-post/post';
import type { CreateFollowRequest } from '@/types/apis/share-post/user';

type Context = {
    prevPost: FetchPost['Response'] | undefined;
};

export default function useCreateFollow({ queryKey }: { queryKey: CustomQueryKey }) {
    const queryClient = useQueryClient();

    return useBaseCreateFollow<Context>({
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
                        isLike: true,
                        likeCount: prevData.post.likeCount + 1,
                    },
                };
            });

            return { prevPost };
        }, [queryClient, queryKey]),
        onError: useCallback(
            (_error: HTTPError, _variables: CreateFollowRequest, context: Context | undefined) => {
                if (context?.prevPost) {
                    queryClient.setQueryData<FetchPost['Response']>(queryKey, context.prevPost);
                }
            },
            [queryClient, queryKey],
        ),
    });
}
