import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type { FetchDetailUserProfile } from '<api/share/post/user>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { sharePostQueryKeys } from '@/apis/@utils/query-keys';

const useFetchUserProfile = ({ nickname }: FetchDetailUserProfile['Request']) => {
    return useQuery<FetchDetailUserProfile['Response'], HTTPError, FetchDetailUserProfile['Response'], readonly string[]>({
        queryKey: sharePostQueryKeys.profile(nickname),
        queryFn: () => getDetailUserProfile({ nickname }),
        throwOnError: true,
    });
};

export default useFetchUserProfile;
