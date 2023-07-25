import { MainStackParamList } from '<Routes>';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationMessageType, NavigationReturnType } from '@reptalieregion/webview-bridge';
import CustomNavigation from './Navigate';

interface INavigateRunnerProps<RouteName extends keyof MainStackParamList> {
    message: NavigationMessageType;
    navigation: NativeStackNavigationProp<MainStackParamList, RouteName>;
}

const NavigateRunner = <RouteName extends keyof MainStackParamList>({
    message: { module, command, payload },
    navigation,
}: INavigateRunnerProps<RouteName>): NavigationReturnType => {
    const customNavigation = CustomNavigation<RouteName>(navigation);

    switch (command) {
        case 'push':
            customNavigation.push(payload);
            return { module, command, payload: undefined };
        default:
            throw new Error('[webview-bridge] not found Navigate command');
    }
};

export default NavigateRunner;
