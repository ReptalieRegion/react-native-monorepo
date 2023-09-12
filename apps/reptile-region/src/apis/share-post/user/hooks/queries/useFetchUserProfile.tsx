import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type { GetDetailUserProfileRequest, SharePostUserData } from '<SharePostUserAPI>';
import { sharePostQueryKeys } from '@/apis/query-keys';

const useFetchUserProfile = ({ userId, nickname }: GetDetailUserProfileRequest) => {
    return useQuery<SharePostUserData>({
        queryKey: sharePostQueryKeys.profile(userId ?? nickname ?? ''),
        queryFn: () => getDetailUserProfile({ userId, nickname }),
    });
};

export default useFetchUserProfile;
