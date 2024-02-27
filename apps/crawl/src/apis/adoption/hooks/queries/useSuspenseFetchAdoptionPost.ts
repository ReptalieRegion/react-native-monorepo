import { faker } from '@faker-js/faker';
import { useQueryClient, useSuspenseQuery, type InfiniteData } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { range } from 'lodash-es';

import { fetchAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ADOPTION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { AdoptionPost, FetchAdoptionPost, FetchAdoptionPostList } from '@/types/apis/adoption';
import type { EntityGender, EntitySize } from '@/types/apis/common';
import type { CustomQueryKey } from '@/types/apis/react-query';

const initialData: Readonly<AdoptionPost> = {
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
    content: faker.lorem.sentence(),
    price: faker.number.int({ min: 10000, max: 1000000 }),
    gender: ['Female', 'Male', 'Uncategorized'][faker.number.int({ min: 0, max: 3 })] as EntityGender,
    createdAt: dayjs(faker.date.between({ from: '2020-01-01', to: '2024-02-27' })).format(),
};

export default function useSuspenseFetchAdoptionPost({ adoptionId }: FetchAdoptionPost['Request']) {
    const queryClient = useQueryClient();
    const data = queryClient.getQueryData<InfiniteData<FetchAdoptionPostList['Response'], number>>(
        ADOPTION_QUERY_KEYS.list({}),
    );
    const adoptionPosts = data?.pages[0].items.find(({ id }) => id === adoptionId) as AdoptionPost;

    return useSuspenseQuery<FetchAdoptionPost['Response'], HTTPError, FetchAdoptionPost['Response'], CustomQueryKey>({
        queryKey: ADOPTION_QUERY_KEYS.detail(adoptionId),
        initialData: adoptionPosts ?? initialData,
        queryFn: () => fetchAdoptionPost({ adoptionId }),
    });
}
