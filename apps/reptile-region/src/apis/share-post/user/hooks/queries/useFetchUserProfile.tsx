import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type { FetchDetailUserProfile } from '<api/share/post/user>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useFetchUserProfile = ({ nickname }: FetchDetailUserProfile['Request']) => {
    return useQuery<FetchDetailUserProfile['Response']>({
        queryKey: sharePostQueryKeys.profile(nickname),
        queryFn: () => getDetailUserProfile({ nickname }),
        suspense: true,
    });
};

export default useFetchUserProfile;
