import { useQuery } from '@tanstack/react-query';

import { signInCheck } from '../../repository';

import { AUTH_QUERY_KEYS } from '@/apis/@utils/query-keys';

export default function useSignInCheck() {
    return useQuery({
        queryKey: AUTH_QUERY_KEYS.signInCheck,
        queryFn: signInCheck,
    });
}
