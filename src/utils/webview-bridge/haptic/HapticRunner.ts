import { HapticMessageType, HapticReturnType } from '@reptalieregion/webview-bridge';
import Haptic from './Haptic';

const HapticRunner = ({ module, command, data }: HapticMessageType): HapticReturnType => {
    switch (command) {
        case 'trigger':
            return { module, command, data: Haptic.trigger(data) };
        default:
            throw new Error('[webview-bridge] not found Haptic command');
    }
};

export default HapticRunner;
