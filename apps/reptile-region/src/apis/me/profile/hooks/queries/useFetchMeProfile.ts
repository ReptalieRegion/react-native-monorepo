import { useQuery } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type { FetchMeProfile } from '<api/share/post>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';

// 사용자 프로필 조회
type UseFetchMeProfileState = {
    enabled: boolean | undefined;
};

export default function useFetchMeProfile(props?: UseFetchMeProfileState) {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], readonly string[]>({
        queryKey: MY_QUERY_KEYS.profile,
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: props?.enabled,
        queryFn: fetchMeProfile,
    });
}
