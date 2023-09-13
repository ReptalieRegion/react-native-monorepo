declare module '<InfoRoutes>' {
    import type { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type InfoParamList = {
        'info/list': undefined;
    };

    type InfoRouteProp<RouteName extends keyof InfoParamList> = RouteProp<InfoParamList, RouteName>;

    type InfoNavigationProp<RouteName extends keyof InfoParamList> = NativeStackNavigationProp<InfoParamList, RouteName>;
}
