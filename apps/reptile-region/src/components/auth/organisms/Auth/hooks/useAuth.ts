import { useCallback, useContext } from 'react';

import { AuthActionsContext, AuthStateContext } from '../contexts/AuthContext';

import type { AuthTokens } from '<api/auth>';
import { deleteAuthTokens, registerAuthTokens } from '@/apis/auth/utils/secure-storage-token';

export const useAuth = () => {
    const state = useContext(AuthStateContext);
    const dispatch = useContext(AuthActionsContext);

    if (state === null || dispatch === null) {
        throw new Error('Auth Provider를 감싸주세요.');
    }

    const signIn = useCallback(
        async (tokens: AuthTokens) => {
            await registerAuthTokens(tokens);
            dispatch({ type: 'SIGN_IN' });
        },
        [dispatch],
    );

    const signOut = useCallback(async () => {
        await deleteAuthTokens();
        dispatch({ type: 'SIGN_OUT' });
    }, [dispatch]);

    return {
        ...state,
        signIn,
        signOut,
    };
};
