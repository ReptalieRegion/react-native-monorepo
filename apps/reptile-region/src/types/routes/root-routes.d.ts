declare module '<RootRoutes>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { BottomTabStackParamList } from '<BottomTabNavigationList>';

    type SharePostDetailProps = {
        userId?: string;
        nickname: string;
    };

    type RootStackParamList = {
        /** Bottom Tab 있는 페이지 */
        'bottom-tab': NavigatorScreenParams<BottomTabStackParamList>;

        /** Bottom Tab 없는 페이지 */
        'share-post/detail': SharePostDetailProps;
        'share-post/image-crop': undefined;
        'share-post/write': undefined;

        /** Bottom Tab 없고 밑에서 위로 올라오는 페이지 */
        'auth/sign-in': undefined;
        'auth/sign-up': undefined;

        /** webview 예시 */
        'webview-example': undefined;
    };
}
