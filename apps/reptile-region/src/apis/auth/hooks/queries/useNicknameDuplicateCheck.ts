import { useQuery } from '@tanstack/react-query';

import { nicknameDuplicateCheck } from '../../repository';

import type { NicknameDuplicateCheck } from '<api/auth>';
import type { EnableParam } from '<api/utils>';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { authQueryKeys } from '@/apis/@utils/query-keys';

const useNicknameDuplicateCheck = ({ nickname, enabled }: NicknameDuplicateCheck['Request'] & EnableParam) => {
    return useQuery<NicknameDuplicateCheck['Response'], HTTPError, NicknameDuplicateCheck['Response'], readonly string[]>({
        queryKey: authQueryKeys.duplicateNickname(nickname),
        queryFn: () => nicknameDuplicateCheck({ nickname }),
        throwOnError: true,
        enabled,
    });
};

export default useNicknameDuplicateCheck;
