import { useQuery, type UndefinedInitialDataOptions } from '@tanstack/react-query';

import { signInCheck } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { AUTH_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { SignInCheck } from '@/types/apis/auth';
import type { CustomQueryKey } from '@/types/apis/react-query';

export default function useBaseSignInCheck<TData>(
    props?: Pick<UndefinedInitialDataOptions<SignInCheck['Response'], HTTPError, TData, CustomQueryKey>, 'select'>,
) {
    return useQuery<SignInCheck['Response'], HTTPError, TData, CustomQueryKey>({
        queryKey: AUTH_QUERY_KEYS.signInCheck,
        queryFn: () => signInCheck(),
        staleTime: Infinity,
        gcTime: Infinity,
        ...props,
    });
}
