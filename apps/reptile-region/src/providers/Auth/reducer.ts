import type { AuthActions, AuthState } from './types';

export default function authReducer(state: AuthState, actions: AuthActions): AuthState {
    switch (actions.type) {
        case 'SIGN_IN':
            return { ...state, isSignIn: true };
        case 'SIGN_OUT':
            return { ...state, isSignIn: false };
    }
}
