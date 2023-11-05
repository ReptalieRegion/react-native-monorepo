import type { AuthActions, AuthState } from '../types';

const authReducer = (state: AuthState, actions: AuthActions): AuthState => {
    switch (actions.type) {
        case 'SIGN_IN':
            return { ...state, isSignIn: true };
        case 'SIGN_OUT':
            return { ...state, isSignIn: false };
        default:
            return state;
    }
};

export default authReducer;
