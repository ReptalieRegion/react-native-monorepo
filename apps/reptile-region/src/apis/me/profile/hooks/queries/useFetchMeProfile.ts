import { useQuery } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { ME_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchMeProfile } from '@/types/apis/share-post/post';

// 사용자 프로필 조회
type UseFetchMeProfileState = {
    enabled: boolean | undefined;
};

type QueryKey = string | { type: string };

export default function useFetchMeProfile(props?: UseFetchMeProfileState) {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], readonly QueryKey[]>({
        queryKey: ME_QUERY_KEYS.profile,
        staleTime: 9 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: props?.enabled,
        queryFn: fetchMeProfile,
    });
}
