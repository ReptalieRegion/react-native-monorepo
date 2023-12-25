import React, { useEffect, useReducer, type PropsWithChildren } from 'react';

import { AuthActionsContext, AuthStateContext } from './context';
import authReducer from './reducer';

import { initRefreshFailCallback } from '@/apis/@utils/fetcher';

export default function AuthProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(authReducer, { isSignIn: false });

    useEffect(() => {
        initRefreshFailCallback(() => dispatch({ type: 'SIGN_OUT' }));
    }, []);

    return (
        <AuthActionsContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>{children}</AuthStateContext.Provider>
        </AuthActionsContext.Provider>
    );
}
