import { RootStackParamList } from '<Routes>';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationMessageType, NavigationReturnType } from '@reptalieregion/webview-bridge';
import CustomNavigation from './Navigate';

interface INavigateRunnerProps<RouteName extends keyof RootStackParamList> {
    message: NavigationMessageType;
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
}

const NavigateRunner = <RouteName extends keyof RootStackParamList>({
    message: { module, command, data },
    navigation,
}: INavigateRunnerProps<RouteName>): NavigationReturnType => {
    const customNavigation = CustomNavigation<RouteName>(navigation);

    switch (command) {
        case 'push':
            return { module, command, data: customNavigation.push(data) };
        default:
            throw new Error('[webview-bridge] not found Navigate command');
    }
};

export default NavigateRunner;
