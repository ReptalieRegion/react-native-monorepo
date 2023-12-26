import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { AUTH_QUERY_KEYS } from '@/apis/@utils/query-keys';
import { deleteAuthTokens } from '@/apis/auth/utils/secure-storage-token';

export default function useAuthHandler() {
    const queryClient = useQueryClient();

    const signOut = useCallback(async () => {
        await deleteAuthTokens();
        queryClient.invalidateQueries();
        queryClient.setQueryData(AUTH_QUERY_KEYS.signInCheck, () => {
            return { message: 'fail' };
        });
    }, [queryClient]);

    const signIn = useCallback(async () => {
        queryClient.invalidateQueries();
        queryClient.setQueryData(AUTH_QUERY_KEYS.signInCheck, () => {
            return { message: 'success' };
        });
    }, [queryClient]);

    return {
        signIn,
        signOut,
    };
}