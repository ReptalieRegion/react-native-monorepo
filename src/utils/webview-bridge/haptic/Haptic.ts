import { IHapticInterface } from '@reptalieregion/webview-bridge';
import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';

const Haptic: IHapticInterface = {
    trigger: (payload) => {
        const { type, options } = payload;
        RNReactNativeHapticFeedback.trigger(type, options);
    },
};

export default Haptic;
