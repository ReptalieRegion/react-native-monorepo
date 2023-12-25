import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useReducer, type PropsWithChildren } from 'react';

import { AuthActionsContext, AuthStateContext } from './context';
import authReducer from './reducer';

import { initRefreshFailCallback } from '@/apis/@utils/fetcher';

export default function AuthProvider({ children }: PropsWithChildren) {
    const queryClient = useQueryClient();
    const [state, dispatch] = useReducer(authReducer, { isSignIn: false });

    /**
     * clientFetch에서 refresh 실패했을 때 실행할 로직 초기화
     */
    useEffect(() => {
        initRefreshFailCallback(() => {
            queryClient.invalidateQueries();
            dispatch({ type: 'SIGN_OUT' });
        });
    }, [queryClient]);

    return (
        <AuthActionsContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
        </AuthActionsContext.Provider>
    );
}
