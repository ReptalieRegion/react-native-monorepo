import { NativeModules, Platform } from 'react-native';

import type { KakaoOAuthToken, KakaoProfile } from './type';

const LINKING_ERROR =
    "The package 'react-native-kakao-auth' doesn't seem to be linked. Make sure: \n\n" +
    Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
    '- You rebuilt the app after installing the package\n' +
    '- You are not using Expo Go\n';

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
