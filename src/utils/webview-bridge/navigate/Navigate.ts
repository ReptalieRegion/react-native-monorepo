import { RootStackParamList } from '<Routes>';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { INavigation, TPushPayload } from '@reptalieregion/webview-bridge';

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

const CustomNavigation = <RouteName extends keyof RootStackParamList>(
    navigate: NativeStackNavigationProp<RootStackParamList, RouteName>,
): INavigation => {
    return {
        push: (payload) => {
            const { route, params } = parsePayload(payload);
            navigate.push(route, params);
        },
    };
};

export default CustomNavigation;
