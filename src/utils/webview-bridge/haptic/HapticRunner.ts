import { HapticMessageType, HapticReturnType } from '@reptalieregion/webview-bridge';
import Haptic from './Haptic';

const HapticRunner = ({ module, command, payload }: HapticMessageType): HapticReturnType => {
    switch (command) {
        case 'trigger':
            return { module, command, payload: Haptic.trigger(payload) };
        default:
            throw new Error('[webview-bridge] not found Haptic command');
    }
};

export default HapticRunner;
