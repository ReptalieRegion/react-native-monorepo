declare module '<HomeRoutes>' {
    import type { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type HomeParamList = {
        'home/list': undefined;
    };

    type HomeRouteProp<RouteName extends keyof HomeParamList> = RouteProp<HomeParamList, RouteName>;

    type HomeNavigationProp<RouteName extends keyof HomeParamList> = NativeStackNavigationProp<HomeParamList, RouteName>;
}
