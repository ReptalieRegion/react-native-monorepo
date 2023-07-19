import { PostMessageType, serializeReturnMessage } from '@reptalieregion/webview-bridge';
import HapticRunner from './haptic/HapticRunner';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '<Routes>';
import NavigateRunner from './navigate/NavigateRunner';
import AsyncStorageRunner from './async-storage/AsyncStorageRunner';

interface WebviewBridgeRunnerProps<RouteName extends keyof RootStackParamList> {
    message: PostMessageType;
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
}

const webviewBridgeRunner = async <RouteName extends keyof RootStackParamList>(props: WebviewBridgeRunnerProps<RouteName>) => {
    const { message, navigation } = props;
    const { module } = message;

    if (module === 'Navigation') {
        return serializeReturnMessage(NavigateRunner<RouteName>({ message, navigation }));
    }

    if (module === 'AsyncStorage') {
        return serializeReturnMessage(await AsyncStorageRunner(message));
    }

    if (module === 'Haptic') {
        return serializeReturnMessage(HapticRunner(message));
    }
};

export default webviewBridgeRunner;
