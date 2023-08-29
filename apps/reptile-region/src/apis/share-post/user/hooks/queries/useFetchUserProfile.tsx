import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type { GetDetailUserProfileRequest, SharePostUserData } from '<SharePostUserAPI>';
import { userQueryKeys } from '@/apis/share-post/query-keys';

const useFetchUserProfile = ({ userId }: GetDetailUserProfileRequest) => {
    return useQuery<SharePostUserData>({
        queryKey: userQueryKeys.profile(userId),
        queryFn: () => getDetailUserProfile({ userId }),
    });
};

export default useFetchUserProfile;
