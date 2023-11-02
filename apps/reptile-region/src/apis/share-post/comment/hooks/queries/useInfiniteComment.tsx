import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getComments } from '../../repository';

import type { FetchComment } from '<api/share/post/comment>';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useInfiniteComment = ({ postId }: FetchComment['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchComment['Response'],
        any,
        InfiniteData<FetchComment['Response']>,
        readonly string[],
        number
    >({
        queryKey: sharePostQueryKeys.comment(postId),
        initialPageParam: 0,
        staleTime: 1 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteComment;
