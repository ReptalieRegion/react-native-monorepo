import { useQuery } from '@tanstack/react-query';

import { checkBlockingUser } from '../repository';

import { USER_ERROR_CODE } from '@/apis/@utils/error/code';
import type HTTPError from '@/apis/@utils/error/HTTPError';
import { REPORT_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { CheckBlockUser } from '@/types/apis/report/block-user';

export default function useBaseCheckBlockUser({ nickname }: CheckBlockUser['Request']) {
    return useQuery<CheckBlockUser['Response'], HTTPError, CheckBlockUser['Response'], CustomQueryKey>({
        queryKey: REPORT_QUERY_KEYS.isBlockedUser(nickname),
        queryFn: () => checkBlockingUser({ nickname }),
        throwOnError: (error) => error.code !== USER_ERROR_CODE.JSON_WEB_TOKEN_ACCESS,
    });
}
