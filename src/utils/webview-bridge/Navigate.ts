import { RootStackParamList } from '<Routes>';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { INavigate, TPushPayload } from '@reptalieregion/webview-bridge';

const parsePayload = (payload: TPushPayload) => {
    const route = payload.route as keyof RootStackParamList;
    switch (route) {
        case 'HomePage':
            return { route, params: payload.params as RootStackParamList['HomePage'] };
        case 'ImageCropPage':
            return { route, params: payload.params as RootStackParamList['ImageCropPage'] };
        default:
            throw new Error('[webview-bridge] not found Navigate route');
    }
};

const NavigateRunner = <RouteName extends keyof RootStackParamList>(
    command: keyof INavigate,
    data: unknown,
    navigate: NativeStackNavigationProp<RootStackParamList, RouteName>,
) => {
    const Navigate: INavigate = {
        push: (payload) => {
            const { route, params } = parsePayload(payload);
            navigate.push(route, params);
        },
    };

    switch (command) {
        case 'push':
            Navigate.push(data as TPushPayload);
            break;
        default:
            throw new Error('[webview-bridge] not found Navigate command');
    }
};

export default NavigateRunner;
