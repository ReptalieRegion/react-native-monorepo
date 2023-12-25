import { createContext } from 'react';

import type { AuthActions, AuthState } from './types';

const AuthStateContext = createContext<AuthState | null>(null);

const AuthActionsContext = createContext<React.Dispatch<AuthActions> | null>(null);

export { AuthActionsContext, AuthStateContext };
