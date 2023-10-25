import { NativeModules } from 'react-native';

import type { KakaoOAuthToken, KakaoProfile } from './type';

const LINKING_ERROR = "The Native Module RNKakaoAuth doesn't seem to be link";

const RNKakaoAuth = NativeModules.RNKakaoAuth
    ? NativeModules.RNKakaoAuth
    : new Proxy(
          {},
          {
              get() {
                  throw new Error(LINKING_ERROR);
              },
          },
      );

const KakaoAuth = {
    login(): Promise<KakaoOAuthToken> {
        return RNKakaoAuth.login();
    },
    logout(): Promise<void> {
        return RNKakaoAuth.logout();
    },
    getProfile(): Promise<KakaoProfile> {
        return RNKakaoAuth.getProfile();
    },
};

export default KakaoAuth;
