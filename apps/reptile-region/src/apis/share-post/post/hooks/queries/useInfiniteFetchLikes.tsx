import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';

import { getLikes } from '../../repository';

import type { FetchLike } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useInfiniteFetchLikes = ({ postId }: FetchLike['Request']) => {
    return useSuspenseInfiniteQuery<
        FetchLike['Response'],
        HTTPError,
        InfiniteData<FetchLike['Response']>,
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.likeList(postId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getLikes({ postId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
};

export default useInfiniteFetchLikes;
