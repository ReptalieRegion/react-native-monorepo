declare module '<BottomTabInfoRoutes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabInfoListNavigationProp = NativeStackNavigationProp<BottomTabInfoParamList, 'info/list'>;

    type BottomTabInfoParamList = {
        'info/list': undefined;
    };
}
