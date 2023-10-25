import { NativeModules } from 'react-native';

interface GoogleAuth {
    login(): Promise<void>;
}

export const RNGoogleAuthModule = NativeModules.RNGoogleAuthModule;

export const GoogleAuth: GoogleAuth = {
    login: () => {
        return RNGoogleAuthModule.login();
    },
};
