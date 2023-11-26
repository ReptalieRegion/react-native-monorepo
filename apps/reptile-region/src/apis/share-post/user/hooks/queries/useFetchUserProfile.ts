import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { FetchDetailUserProfile } from '@/types/apis/share-post/user';

// 특정 사용자 프로필 조회
export default function useFetchUserProfile({ nickname }: FetchDetailUserProfile['Request']) {
    return useQuery<FetchDetailUserProfile['Response'], HTTPError, FetchDetailUserProfile['Response'], readonly string[]>({
        queryKey: SHARE_POST_QUERY_KEYS.profileDetail(nickname),
        queryFn: () => getDetailUserProfile({ nickname }),
        throwOnError: true,
    });
}
