declare module '<BottomTabHomeRoutes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabHomeListNavigationProp = NativeStackNavigationProp<HomeRoutesParamList, 'home/list'>;

    type BottomTabHomeRoutesParamList = {
        'home/list': undefined;
    };
}
