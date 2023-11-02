import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getLikes } from '../../repository';

import type { FetchLike } from '<api/share/post>';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteFetchLikes = ({ postId }: FetchLike['Request']) => {
    return useSuspenseInfiniteQuery<FetchLike['Response'], any, InfiniteData<FetchLike['Response']>, readonly string[], number>(
        {
            queryKey: sharePostQueryKeys.likeList(postId),
            initialPageParam: 0,
            queryFn: ({ pageParam }) => getLikes({ postId, pageParam }),
            getNextPageParam: (lastPage) => lastPage.nextPage,
        },
    );
};

export default useInfiniteFetchLikes;
