import { useQuery } from '@tanstack/react-query';

import { nicknameDuplicateCheck } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { AUTH_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { NicknameDuplicateCheck } from '@/types/apis/auth';
import type { CustomQueryKey } from '@/types/react-query';

// 닉네임 중복 체크
type UseNicknameDuplicateCheckProps = NicknameDuplicateCheck['Request'] & {
    enabled: boolean;
};

export default function useNicknameDuplicateCheck({ nickname, enabled }: UseNicknameDuplicateCheckProps) {
    return useQuery<NicknameDuplicateCheck['Response'], HTTPError, NicknameDuplicateCheck['Response'], CustomQueryKey>({
        queryKey: AUTH_QUERY_KEYS.duplicateNickname(nickname),
        queryFn: () => nicknameDuplicateCheck({ nickname }),
        throwOnError: true,
        enabled,
    });
}
