declare module '<RootRoutes>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    import type { BottomTabLessParamList } from '<BottomTabLessNavigationList>';
    import type { BottomTabLessSlideFromBottomParamList } from '<BottomTabLessSlidFromBottomNavigationList>';
    import type { BottomTabParamList } from '<BottomTabNavigationList>';

    type BottomTabStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'bottom-tab'>;

    type BottomTabLessStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'bottom-tab-less'>;

    type WebviewExampleStackNavigationProp = NativeStackNavigationProp<RootStackParamList, 'webview-example'>;

    type RootStackParamList = {
        'bottom-tab': NavigatorScreenParams<BottomTabParamList>;
        'bottom-tab-less': NavigatorScreenParams<BottomTabLessParamList>;
        'bottom-tab-less-slide-from-bottom': NavigatorScreenParams<BottomTabLessSlideFromBottomParamList>;
        'webview-example': undefined;
    };
}
