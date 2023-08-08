import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationMessageType, NavigationReturnType } from '@reptalieregion/webview-bridge';

import CustomNavigation from './Navigate';

import { RootStackParamList } from '<RootRoutes>';

interface INavigateRunnerProps<RouteName extends keyof RootStackParamList> {
    message: NavigationMessageType;
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
}

const NavigateRunner = <RouteName extends keyof RootStackParamList>({
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
