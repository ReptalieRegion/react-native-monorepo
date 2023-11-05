import { useQuery } from '@tanstack/react-query';

import { fetchMeProfile } from '../../repository';

import type { FetchMeProfile } from '<api/my/profile>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { myQueryKeys } from '@/apis/@utils/query-keys';

type UseFetchMeProfileState = {
    enabled?: boolean;
};

type UseFetchMeProfileProps = UseFetchMeProfileState;

const useFetchMeProfile = (props?: UseFetchMeProfileProps) => {
    return useQuery<FetchMeProfile['Response'], HTTPError, FetchMeProfile['Response'], readonly string[]>({
        queryKey: myQueryKeys.profile,
        queryFn: fetchMeProfile,
        staleTime: Infinity,
        gcTime: Infinity,
        enabled: props?.enabled,
    });
};

export default useFetchMeProfile;
