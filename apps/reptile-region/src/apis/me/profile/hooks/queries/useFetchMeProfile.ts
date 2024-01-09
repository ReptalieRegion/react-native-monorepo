import { useQuery, type UndefinedInitialDataOptions } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchMeProfile } from '@/types/apis/share-post/post';

export default function useFetchMeProfile(
    props?: Pick<
        UndefinedInitialDataOptions<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], CustomQueryKey>,
        'enabled'
    >,
) {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], CustomQueryKey>({
        queryKey: ME_QUERY_KEYS.profile,
        initialData: {
            user: {
                id: '',
                nickname: '',
                profile: {
                    src: '',
                },
            },
        },
        ...props,
        queryFn: fetchMeProfile,
    });
}
