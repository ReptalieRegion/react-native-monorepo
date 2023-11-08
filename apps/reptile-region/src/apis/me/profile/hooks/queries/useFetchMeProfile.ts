import { useQuery } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type { FetchMeProfile } from '<api/my/profile>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { MY_QUERY_KEYS } from '@/apis/@utils/query-keys';

const useFetchMeProfile = () => {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], readonly string[]>({
        queryKey: MY_QUERY_KEYS.profile,
        queryFn: fetchMeProfile,
    });
};

export default useFetchMeProfile;
