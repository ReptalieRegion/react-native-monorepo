import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getComments } from '../../repository';

import type { FetchComment } from '<api/share/post/comment>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useInfiniteComment = ({ postId }: FetchComment['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchComment['Response'],
        HTTPError,
        InfiniteData<FetchComment['Response']>,
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.comment(postId),
        initialPageParam: 0,
        staleTime: 1 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        queryFn: ({ pageParam }) => getComments({ pageParam, postId }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteComment;
