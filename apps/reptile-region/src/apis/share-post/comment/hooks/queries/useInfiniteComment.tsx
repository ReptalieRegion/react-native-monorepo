import { useInfiniteQuery } from '@tanstack/react-query';

import { getComments } from '../../repository';

import type { FetchComment } from '<api/share/post/comment>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useInfiniteComment = ({ postId }: FetchComment['Request']) => {
    return useInfiniteQuery<FetchComment['Response']>({
        queryKey: sharePostQueryKeys.comment(postId),
        queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        staleTime: 1 * 60 * 1000,
        cacheTime: 5 * 60 * 1000,
        suspense: true,
    });
};

export default useInfiniteComment;
