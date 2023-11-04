type AuthState = {
    isSignIn: boolean;
};

interface SignIn {
    type: 'SIGN_IN';
}

interface SignOut {
    type: 'SIGN_OUT';
}

type AuthActions = SignIn | SignOut;

export type { AuthActions, AuthState };
