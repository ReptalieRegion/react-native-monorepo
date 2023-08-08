declare module '<BottomTabShopRoutes>' {
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type BottomTabShopListNavigationProp = NativeStackNavigationProp<BottomTabShopParamList, 'shop/list'>;

    type BottomTabShopParamList = {
        'shop/list': undefined;
    };
}
