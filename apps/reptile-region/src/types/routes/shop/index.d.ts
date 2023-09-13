declare module '<ShopRoutes>' {
    import type { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type ShopParamList = {
        'shop/list': undefined;
    };

    type ShopRouteProp<RouteName extends keyof ShopParamList> = RouteProp<ShopParamList, RouteName>;

    type ShopNavigationProp<RouteName extends keyof SharePostParamList> = NativeStackNavigationProp<ShopParamList, RouteName>;
}
