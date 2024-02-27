import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';

import { fetchInfiniteAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ADOPTION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchAdoptionPostList, FetchAdoptionPostListResponse } from '@/types/apis/adoption';
import type { AdoptionFilterQueryKey } from '@/types/apis/react-query';
import type { InfiniteState } from '@/types/apis/utils';

export default function useSuspenseInfiniteAdoption({
    location,
    priceRange,
    size,
    gender,
    variety,
}: FetchAdoptionPostList['Request']) {
    return useSuspenseInfiniteQuery<
        FetchAdoptionPostList['Response'],
        HTTPError,
        FetchAdoptionPostListResponse[],
        AdoptionFilterQueryKey,
        number
    >({
        queryKey: ADOPTION_QUERY_KEYS.list({ gender, location, priceRange, size, variety }),
        initialPageParam: 0,
        queryFn: ({ pageParam }) => fetchInfiniteAdoptionPost({ pageParam, location, priceRange, size, gender, variety }),
        getNextPageParam: (lastPage) => lastPage.nextPage,
        select: useCallback(
            (data: InfiniteData<InfiniteState<FetchAdoptionPostListResponse[]>, number>) =>
                data.pages.flatMap((page) => page.items),
            [],
        ),
    });
}
