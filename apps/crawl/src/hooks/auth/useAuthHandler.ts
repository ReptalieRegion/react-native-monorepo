import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { AUTH_QUERY_KEYS } from '@/apis/@utils/query-keys';
import { deleteAuthTokens, registerAuthTokens } from '@/apis/auth/utils/secure-storage-token';
import type { RefreshToken } from '@/types/apis/auth';

export default function useAuthHandler() {
    const queryClient = useQueryClient();

    const signOut = useCallback(async () => {
        deleteAuthTokens();
        queryClient.removeQueries({
            predicate: (query) => query.queryKey !== AUTH_QUERY_KEYS.signInCheck,
        });
        queryClient.setQueryData(AUTH_QUERY_KEYS.signInCheck, () => {
            return { message: 'fail' };
        });
    }, [queryClient]);

    const signIn = useCallback(
        async (tokens: RefreshToken['Response']) => {
            await registerAuthTokens(tokens);
            queryClient.removeQueries({
                predicate: (query) => {
                    return query.queryKey[0] !== AUTH_QUERY_KEYS.signInCheck[0] && query.queryKey[0] !== 'me';
                },
            });
            queryClient.invalidateQueries();
            queryClient.setQueryData(AUTH_QUERY_KEYS.signInCheck, () => {
                return { message: 'success' };
            });
        },
        [queryClient],
    );

    return {
        signIn,
        signOut,
    };
}
