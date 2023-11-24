import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { getDetailUserPosts } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchDetailUserPost, FetchDetailUserPostResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

export default function useInfiniteUserPosts({ nickname }: FetchDetailUserPost['Request']) {
    return useSuspenseInfiniteQuery<
        FetchDetailUserPost['Response'],
        HTTPError,
        FetchDetailUserPostResponse[],
        readonly string[],
        number
    >({
        queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(nickname),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => getDetailUserPosts({ nickname, pageParam }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchDetailUserPostResponse[]>, number>) =>
                data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
