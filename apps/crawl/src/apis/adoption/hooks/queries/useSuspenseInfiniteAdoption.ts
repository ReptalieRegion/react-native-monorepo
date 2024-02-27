import { range } from '@crawl/utils';
import { faker } from '@faker-js/faker';
import { useSuspenseInfiniteQuery, type InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback } from 'react';

import { fetchInfiniteAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ADOPTION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { AdoptionPost, FetchAdoptionPostList, FetchAdoptionPostListResponse } from '@/types/apis/adoption';
import type { EntityGender, EntitySize } from '@/types/apis/common';
import type { AdoptionFilterQueryKey } from '@/types/apis/react-query';
import type { InfiniteState } from '@/types/apis/utils';

const initialData: InfiniteData<InfiniteState<AdoptionPost[]>, number> = {
    pageParams: [0],
    pages: range(10).map(() => ({
        items: [
            {
                id: faker.string.uuid(),
                images: range(faker.number.int({ min: 1, max: 5 })).map(() => ({ src: faker.image.url() })),
                location: {
                    sido: '서울',
                    gungu: '강남구',
                },
                size: ['베이비', '아성체', '준성체', '성체'][faker.number.int({ min: 0, max: 3 })] as EntitySize,
                user: {
                    id: faker.string.uuid(),
                    nickname: faker.person.firstName(),
                    profile: {
                        src: faker.image.url(),
                    },
                },
                variety: {
                    classification: '도마뱀',
                    species: '게코도마뱀',
                    detailedSpecies: '크레스타드 게코',
                    morph: ['릴리 화이트', '레드'],
                },
                title: faker.lorem.word(),
                content: faker.lorem.paragraphs(),
                price: faker.number.int({ min: 10000, max: 1000000 }),
                gender: ['Female', 'Male', 'Uncategorized'][faker.number.int({ min: 0, max: 2 })] as EntityGender,
                createdAt: dayjs(faker.date.between({ from: '2020-01-01', to: '2024-02-27' })).format(),
            },
        ],
        nextPage: 1,
    })),
};

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
        initialData: initialData,
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
