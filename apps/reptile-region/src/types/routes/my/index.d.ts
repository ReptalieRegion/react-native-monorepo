declare module '<MyRoutes>' {
    import type { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type MyParamList = {
        'my/list': undefined;
        'auth/sign-in': undefined;
        'auth/sign-up': undefined;
    };

    type MyRouteProp<RouteName extends keyof MyParamList> = RouteProp<MyParamList, RouteName>;

    type MyNavigationProp<RouteName extends keyof MyParamList> = NativeStackNavigationProp<MyParamList, RouteName>;
}
