import React, { useReducer, type ReactNode } from 'react';

import { InitialAuth } from '../components';
import { AuthActionsContext, AuthStateContext } from '../contexts/AuthContext';
import authReducer from '../reducer/authReducer';

type AuthProps = {
    children: ReactNode;
};

export default function Auth({ children }: AuthProps) {
    const [state, dispatch] = useReducer(authReducer, { isSignIn: false });

    return (
        <AuthActionsContext.Provider value={dispatch}>
            <AuthStateContext.Provider value={state}>
                <InitialAuth />
                {children}
            </AuthStateContext.Provider>
        </AuthActionsContext.Provider>
    );
}
