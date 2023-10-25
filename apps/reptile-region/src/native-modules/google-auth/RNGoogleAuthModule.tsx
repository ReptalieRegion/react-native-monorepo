import { NativeModules } from 'react-native';

interface GoogleAuth {
    login(): Promise<void>;
    logout(): Promise<void>;
}

export const RNGoogleAuthModule = NativeModules.RNGoogleAuthModule;

export const GoogleAuth: GoogleAuth = {
    login: () => {
        return RNGoogleAuthModule.login();
    },
    logout: () => {
        return RNGoogleAuthModule.logout();
    },
};
