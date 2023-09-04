import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type { GetDetailUserProfileRequest, SharePostUserData } from '<SharePostUserAPI>';
import { userQueryKeys } from '@/apis/share-post/query-keys';

const useFetchUserProfile = ({ userId, nickname }: GetDetailUserProfileRequest) => {
    return useQuery<SharePostUserData>({
        queryKey: userQueryKeys.profile(userId ?? nickname ?? ''),
        queryFn: () => getDetailUserProfile({ userId, nickname }),
    });
};

export default useFetchUserProfile;
