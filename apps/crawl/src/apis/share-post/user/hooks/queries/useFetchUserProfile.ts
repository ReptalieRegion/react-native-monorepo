import { useQuery } from '@tanstack/react-query';

import { getDetailUserProfile } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { FetchDetailUserProfile } from '@/types/apis/share-post/user';

// 특정 사용자 프로필 조회
export default function useFetchUserProfile({
    nickname,
    initialData,
}: FetchDetailUserProfile['Request'] & { initialData?: FetchDetailUserProfile['Response'] }) {
    return useQuery<FetchDetailUserProfile['Response'], HTTPError, FetchDetailUserProfile['Response'], CustomQueryKey>({
        initialData,
        queryKey: SHARE_POST_QUERY_KEYS.profileDetail(nickname),
        queryFn: () => getDetailUserProfile({ nickname }),
    });
}
