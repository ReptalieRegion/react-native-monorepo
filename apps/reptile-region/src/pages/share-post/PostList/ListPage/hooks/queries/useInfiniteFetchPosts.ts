import type { InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import useBaseInfiniteFetchPosts from '@/apis/share-post/post/hooks/queries/useBaseInfiniteFetchPosts';
import type { FetchPostsResponse } from '@/types/apis/share-post/post';
import type { InfiniteState } from '@/types/apis/utils';

export default function useInfiniteFetchPosts() {
    return useBaseInfiniteFetchPosts<FetchPostsResponse[]>({
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchPostsResponse[]>, number>) => data?.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
