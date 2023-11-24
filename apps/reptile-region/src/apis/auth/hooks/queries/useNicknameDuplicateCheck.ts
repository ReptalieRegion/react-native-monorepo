import { useQuery } from '@tanstack/react-query';

import { nicknameDuplicateCheck } from '../../repository';

import type { EnableParam } from '<api/utils>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { AUTH_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { NicknameDuplicateCheck } from '@/types/apis/auth/auth';

// 닉네임 중복 체크
type useNicknameDuplicateCheckProps = NicknameDuplicateCheck['Request'] & EnableParam;

const useNicknameDuplicateCheck = ({ nickname, enabled }: useNicknameDuplicateCheckProps) => {
    return useQuery<NicknameDuplicateCheck['Response'], HTTPError, NicknameDuplicateCheck['Response'], readonly string[]>({
        queryKey: AUTH_QUERY_KEYS.duplicateNickname(nickname),
        queryFn: () => nicknameDuplicateCheck({ nickname }),
        throwOnError: true,
        enabled,
    });
};

export default useNicknameDuplicateCheck;
