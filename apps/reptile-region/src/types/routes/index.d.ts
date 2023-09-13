declare module '<RootRoutes>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { HomeParamList } from '<HomeRoutes>';
    import type { InfoParamList } from '<InfoRoutes>';
    import type { MyParamList } from '<MyRoutes>';
    import type { SharePostParamList } from '<SharePostRoutes>';
    import type { ShopParamList } from '<ShopRoutes>';

    type RootRoutesParamList = {
        'home/routes': NavigatorScreenParams<HomeParamList>;
        'shop/routes': NavigatorScreenParams<ShopParamList>;
        'share-post/routes': NavigatorScreenParams<SharePostParamList>;
        'info/routes': NavigatorScreenParams<InfoParamList>;
        'my/routes': NavigatorScreenParams<MyParamList>;
    };
}
