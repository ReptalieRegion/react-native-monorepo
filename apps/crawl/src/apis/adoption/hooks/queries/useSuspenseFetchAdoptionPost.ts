import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ADOPTION_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchAdoptionPost } from '@/types/apis/adoption';
import type { CustomQueryKey } from '@/types/apis/react-query';

export default function useSuspenseFetchAdoptionPost({ adoptionId }: FetchAdoptionPost['Request']) {
    return useSuspenseQuery<FetchAdoptionPost['Response'], HTTPError, FetchAdoptionPost['Response'], CustomQueryKey>({
        queryKey: ADOPTION_QUERY_KEYS.detail(adoptionId),
        queryFn: () => fetchAdoptionPost({ adoptionId }),
    });
}
