import RNReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { IHapticInterface, TTriggerPayload } from '@reptalieregion/webview-bridge';

const Haptic: IHapticInterface = {
    trigger: (payload) => {
        const { type, options } = payload;
        RNReactNativeHapticFeedback.trigger(type, options);
    },
};

const HapticRunner = (command: keyof IHapticInterface, payload: unknown) => {
    switch (command) {
        case 'trigger':
            Haptic.trigger(payload as TTriggerPayload);
            break;
        default:
            console.error('Haptic', command, payload);
            break;
    }
};

export default HapticRunner;
