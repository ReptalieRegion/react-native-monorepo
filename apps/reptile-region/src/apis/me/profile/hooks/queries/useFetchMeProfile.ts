import { useQuery } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type { FetchMeProfile } from '<api/my/profile>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { myQueryKeys } from '@/apis/@utils/query-keys';

const useFetchMeProfile = () => {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], readonly string[]>({
        queryKey: myQueryKeys.profile,
        queryFn: fetchMeProfile,
        staleTime: Infinity,
        gcTime: Infinity,
        refetchOnWindowFocus: 'always',
    });
};

export default useFetchMeProfile;