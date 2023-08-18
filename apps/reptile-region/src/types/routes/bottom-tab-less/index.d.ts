declare module '<BottomTabLessNavigationList>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { BottomTabLessSharePostParamList } from '<BottomTabLessSharePostRoutes>';

    type BottomTabLessParamList = {
        'bottom-tab-less/share-post/routes': NavigatorScreenParams<BottomTabLessSharePostParamList>;
    };
}
