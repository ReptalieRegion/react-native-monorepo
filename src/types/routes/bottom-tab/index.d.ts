declare module '<BottomTabNavigationList>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { BottomTabHomeRoutesParamList } from '<BottomTabHomeRoutes>';
    import type { BottomTabInfoParamList } from '<BottomTabInfoRoutes>';
    import type { BottomTabShopParamList } from '<BottomTabMyRoutes>';
    import type { BottomTabSharePostParamList } from '<BottomTabSharePostRoutes>';
    import type { BottomTabShopParamList } from '<BottomTabShopRoutes>';

    type BottomTabParamList = {
        'bottom-tab/home/routes': NavigatorScreenParams<BottomTabHomeRoutesParamList>;
        'bottom-tab/shop/routes': NavigatorScreenParams<BottomTabShopParamList>;
        'bottom-tab/share-post/routes': NavigatorScreenParams<BottomTabSharePostParamList>;
        'bottom-tab/info/routes': NavigatorScreenParams<BottomTabInfoParamList>;
        'bottom-tab/my/routes': NavigatorScreenParams<BottomTabShopParamList>;
    };
}
