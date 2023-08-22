declare module '<BottomTabLessNavigationList>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { BottomTabLessAuthParamList } from '<BottomTabLessAuthRoutes>';
    import type { BottomTabLessSharePostParamList } from '<BottomTabLessSharePostRoutes>';

    type BottomTabLessParamList = {
        'bottom-tab-less/share-post/routes': NavigatorScreenParams<BottomTabLessSharePostParamList>;
        'bottom-tab-less/auth/routes': NavigatorScreenParams<BottomTabLessAuthParamList>;
    };
}
