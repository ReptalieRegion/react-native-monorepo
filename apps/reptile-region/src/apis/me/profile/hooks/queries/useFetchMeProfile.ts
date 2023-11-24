import { useQuery } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type { FetchMeProfile } from '<api/my/profile>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';

type UseFetchMeProfileState = {
    enabled: boolean | undefined;
};

const useFetchMeProfile = (props?: UseFetchMeProfileState) => {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], readonly string[]>({
        queryKey: MY_QUERY_KEYS.profile,
        queryFn: fetchMeProfile,
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: props?.enabled,
    });
};

export default useFetchMeProfile;
