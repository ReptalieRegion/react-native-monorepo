import { useSuspenseQuery } from '@tanstack/react-query';

import { checkBlockingUser } from '../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { REPORT_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CustomQueryKey } from '@/types/apis/react-query';
import type { CheckBlockUser } from '@/types/apis/report/block-user';

export default function useBaseCheckBlockUser({ nickname }: CheckBlockUser['Request']) {
    return useSuspenseQuery<CheckBlockUser['Response'], HTTPError, CheckBlockUser['Response'], CustomQueryKey>({
        queryKey: REPORT_QUERY_KEYS.isBlockedUser(nickname),
        queryFn: () => checkBlockingUser({ nickname }),
    });
}
