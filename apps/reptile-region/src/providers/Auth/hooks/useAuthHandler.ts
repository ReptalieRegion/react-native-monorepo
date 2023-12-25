import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useContext, useMemo } from 'react';

import { AuthActionsContext } from '../context';

import { deleteAuthTokens } from '@/apis/auth/utils/secure-storage-token';

// 로그인, 로그 아웃 시 캐시 무효화
export default function useAuthHandler() {
    const queryClient = useQueryClient();
    const dispatch = useContext(AuthActionsContext);

    if (dispatch === null) {
        throw new Error('Auth Provider를 감싸주세요');
    }

    const signIn = useCallback(() => {
        queryClient.invalidateQueries();
        dispatch({ type: 'SIGN_IN' });
    }, [dispatch, queryClient]);

    const signOut = useCallback(() => {
        queryClient.invalidateQueries();
        deleteAuthTokens().then(() => dispatch({ type: 'SIGN_OUT' }));
    }, [dispatch, queryClient]);

    return useMemo(
        () => ({
            signIn,
            signOut,
        }),
        [signIn, signOut],
    );
}
