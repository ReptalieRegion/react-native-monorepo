declare module '<BottomTabNavigationList>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { BottomTabHomeRoutesParamList } from '<BottomTabHomeRoutes>';
    import type { BottomTabInfoParamList } from '<BottomTabInfoRoutes>';
    import type { BottomTabShopParamList } from '<BottomTabMyRoutes>';
    import type { BottomTabSharePostParamList } from '<BottomTabSharePostRoutes>';
    import type { BottomTabShopParamList } from '<BottomTabShopRoutes>';

    type SharePostKebabMenuProps = {
        post: {
            id: string;
            isMine: boolean;
        };
        user: {
            id: string;
        };
    };

    type SharePostCommentProps = {
        post: {
            id: string;
        };
    };

    type BottomTabParamList = {
        'home/routes': NavigatorScreenParams<BottomTabHomeRoutesParamList>;
        'shop/routes': NavigatorScreenParams<BottomTabShopParamList>;
        'share-post/routes': NavigatorScreenParams<BottomTabSharePostParamList>;
        'info/routes': NavigatorScreenParams<BottomTabInfoParamList>;
        'my/routes': NavigatorScreenParams<BottomTabShopParamList>;
    };

    type BottomTabStackParamList = {
        'bottom-tab/routes': NavigatorScreenParams<BottomTabParamList>;

        /** Bottom Sheet */
        'share-post/kebab-menu': SharePostKebabMenuProps;
        'share-post/comment': SharePostCommentProps;
    };
}
