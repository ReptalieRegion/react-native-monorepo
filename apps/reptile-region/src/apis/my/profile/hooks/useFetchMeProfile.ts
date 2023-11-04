import { useQuery, type QueryKey } from '@tanstack/react-query';

import { fetchMeProfile } from '../repository';

import type { FetchMeProfile } from '<api/my/profile>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { myQueryKeys } from '@/apis/@utils/query-keys';

const useFetchMeProfile = () => {
    return useQuery<FetchMeProfile['Request'], HTTPError, FetchMeProfile['Request'], QueryKey>({
        queryKey: myQueryKeys.profile,
        queryFn: fetchMeProfile,
        staleTime: Infinity,
        gcTime: Infinity,
    });
};

export default useFetchMeProfile;
