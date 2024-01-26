import { NativeModules } from 'react-native';

const LINKING_ERROR = "The Native Module RNVersionCheck doesn't seem to be link";

const RNVersionCheck = NativeModules.RNVersionCheck
    ? NativeModules.RNVersionCheck
    : new Proxy(
          {},
          {
              get() {
                  throw new Error(LINKING_ERROR);
              },
          },
      );

const VersionCheck = {
    getVersion: (): string => {
        return RNVersionCheck.currentVersion;
    },
};

export default VersionCheck;
