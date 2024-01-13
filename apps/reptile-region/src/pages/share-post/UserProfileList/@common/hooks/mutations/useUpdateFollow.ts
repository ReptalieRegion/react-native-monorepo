import { useQueryClient, type InfiniteData } from '@tanstack/react-query';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseUpdateFollow from '@/apis/share-post/user/hooks/mutations/useBaseUpdateFollow';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchLike, FetchLikeResponse } from '@/types/apis/share-post/post';
import type {
    FetchFollowerList,
    FetchFollowerListResponse,
    FetchFollowingList,
    FetchFollowingListResponse,
    UpdateFollowRequest,
} from '@/types/apis/share-post/user';
import type { InfiniteState } from '@/types/apis/utils';

type Context = {
    prevProfile:
        | InfiniteData<
              | InfiniteState<FetchLikeResponse[]>
              | InfiniteState<FetchFollowerListResponse[]>
              | InfiniteState<FetchFollowerListResponse[]>,
              number
          >
        | undefined;
};

export default function useUpdateFollow({ queryKey }: { queryKey: CustomQueryKey }) {
    const queryClient = useQueryClient();

    return useBaseUpdateFollow<Context>({
        onMutate: async (variables: UpdateFollowRequest) => {
            await queryClient.cancelQueries({ queryKey });
            const prevProfile =
                queryClient.getQueryData<
                    InfiniteData<FetchLike['Response'] | FetchFollowerList['Response'] | FetchFollowingList['Response'], number>
                >(queryKey);
            queryClient.setQueryData<InfiniteData<FetchFollowerList['Response'] | FetchFollowingList['Response'], number>>(
                queryKey,
                (prevData) => {
                    if (prevData === undefined) {
                        return prevData;
                    }

                    const { pageParams, pages } = prevData;

                    const updatePages = [...pages].map((page) => {
                        const { items, nextPage } = page;
                        return {
                            nextPage,
                            items: items.map((item) => {
                                const isTargetProfile = item.user.id === variables.userId;
                                return isTargetProfile ? { user: { ...item.user, isFollow: !item.user.isFollow } } : item;
                            }),
                        };
                    });

                    return {
                        pageParams,
                        pages: updatePages,
                    };
                },
            );

            return { prevProfile };
        },
        onError: (_error: HTTPError, _variables: UpdateFollowRequest, context: Context | undefined) => {
            if (context?.prevProfile) {
                queryClient.setQueryData<
                    InfiniteData<
                        InfiniteState<FetchLikeResponse[] | FetchFollowerListResponse[] | FetchFollowingListResponse[]>,
                        number
                    >
                >(SHARE_POST_QUERY_KEYS.list, context.prevProfile);
            }
        },
    });
}
