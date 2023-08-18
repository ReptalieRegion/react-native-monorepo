declare module '<BottomTabMyRoutes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabMyListNavigationProp = NativeStackNavigationProp<BottomTabMyParamList, 'my/list'>;

    type BottomTabMyParamList = {
        'my/list': undefined;
    };
}
