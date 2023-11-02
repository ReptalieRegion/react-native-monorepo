import { useQuery } from '@tanstack/react-query';

import { nicknameDuplicateCheck } from '../../repository';

import type { NicknameDuplicateCheck } from '<api/auth>';
import { authQueryKeys } from '@/apis/@utils/query-keys';

const useNicknameDuplicateCheck = ({ nickname }: NicknameDuplicateCheck['Request']) => {
    return useQuery<NicknameDuplicateCheck['Response']>({
        queryKey: authQueryKeys.duplicateNickname(nickname),
        queryFn: () => nicknameDuplicateCheck({ nickname }),
        throwOnError: true,
    });
};

export default useNicknameDuplicateCheck;
