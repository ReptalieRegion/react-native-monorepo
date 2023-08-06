import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { INavigation, TPushPayload } from '@reptalieregion/webview-bridge';

import { MainStackParamList } from '<Routes>';

const parsePayload = (payload: TPushPayload) => {
    const route = payload.route as keyof MainStackParamList;
    switch (route) {
        case 'HomePage':
            return { route, params: payload.params as MainStackParamList['HomePage'] };
        default:
            throw new Error('[webview-bridge] not found Navigate route');
    }
};

const CustomNavigation = <RouteName extends keyof MainStackParamList>(
    navigate: NativeStackNavigationProp<MainStackParamList, RouteName>,
): INavigation => {
    return {
        push: (payload) => {
            const { route, params } = parsePayload(payload);
            navigate.push(route, params);
        },
    };
};

export default CustomNavigation;
