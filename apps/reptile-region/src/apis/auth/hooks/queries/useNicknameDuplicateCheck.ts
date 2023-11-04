import { useQuery } from '@tanstack/react-query';

import { nicknameDuplicateCheck } from '../../repository';

import type { NicknameDuplicateCheck } from '<api/auth>';
import type { EnableParam } from '<api/utils>';
import { authQueryKeys } from '@/apis/@utils/query-keys';

const useNicknameDuplicateCheck = ({ nickname, enabled }: NicknameDuplicateCheck['Request'] & EnableParam) => {
    console.log(enabled);
    return useQuery<NicknameDuplicateCheck['Response']>({
        queryKey: authQueryKeys.duplicateNickname(nickname),
        queryFn: () => nicknameDuplicateCheck({ nickname }),
        throwOnError: true,
        enabled,
    });
};

export default useNicknameDuplicateCheck;
