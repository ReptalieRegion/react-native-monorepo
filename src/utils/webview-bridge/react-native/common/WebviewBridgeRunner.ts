import { RNPostMessageType, RNPostReturnType } from '@reptalieregion/webview-bridge';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MainStackParamList } from '<Routes>';
import NavigateRunner from '../navigate/NavigateRunner';
import AsyncStorageRunner from '../async-storage/AsyncStorageRunner';
import HapticRunner from '../haptic/HapticRunner';

interface WebviewBridgeRunnerProps<RouteName extends keyof MainStackParamList> {
    message: RNPostMessageType;
    navigation: NativeStackNavigationProp<MainStackParamList, RouteName>;
}

const WebviewBridgeRunner = async <RouteName extends keyof MainStackParamList>(
    props: WebviewBridgeRunnerProps<RouteName>,
): Promise<RNPostReturnType> => {
    const { message, navigation } = props;
    const { module } = message;

    try {
        if (module === 'Navigation') {
            return NavigateRunner<RouteName>({ message, navigation });
        }

        if (module === 'AsyncStorage') {
            return await AsyncStorageRunner(message);
        }

        if (module === 'Haptic') {
            return HapticRunner(message);
        }

        throw new Error('not found module');
    } catch (error) {
        throw error;
    }
};

export default WebviewBridgeRunner;
