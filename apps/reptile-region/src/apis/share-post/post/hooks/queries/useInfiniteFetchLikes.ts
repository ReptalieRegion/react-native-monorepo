import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getLikes } from '../../repository';

import type { FetchLike, FetchLikeResponse } from '<api/share/post>';
import type { InfiniteState } from '<api/utils>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useInfiniteFetchLikes = ({ postId }: FetchLike['Request']) => {
    return useSuspenseInfiniteQuery<FetchLike['Response'], HTTPError, FetchLikeResponse[], readonly string[], number>({
        queryKey: SHARE_POST_QUERY_KEYS.likeList(postId),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getLikes({ postId, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchLikeResponse[]>, number>) => data.pages.flatMap((page) => page.items),
            [],
        ),
    });
};

export default useInfiniteFetchLikes;
