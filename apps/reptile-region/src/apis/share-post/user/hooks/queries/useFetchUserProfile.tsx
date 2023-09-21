import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type { GetDetailUserProfileRequest, SharePostUserData } from '<SharePostUserAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useFetchUserProfile = ({ nickname }: GetDetailUserProfileRequest) => {
    return useQuery<SharePostUserData>({
        queryKey: sharePostQueryKeys.profile(nickname),
        queryFn: () => getDetailUserProfile({ nickname }),
        suspense: true,
    });
};

export default useFetchUserProfile;
