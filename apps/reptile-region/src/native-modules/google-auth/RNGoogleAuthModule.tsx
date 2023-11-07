import { NativeModules } from 'react-native';

import type { GoogleResult } from './types';

interface GoogleAuth {
    login(): Promise<GoogleResult>;
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
