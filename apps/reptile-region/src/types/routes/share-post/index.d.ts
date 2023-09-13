declare module '<SharePostRoutes>' {
    import type { RouteProp } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    type SharePostDetailProps = {
        userId?: string;
        nickname: string;
    };

    type SharePostCommentProps = {
        post: {
            id: string;
        };
    };

    type SharePostKebabMenu = {
        post: {
            id: string;
            isMine: boolean;
        };
        user: {
            id: string;
        };
    };

    type SharePostParamList = {
        /** Bottom Tab이 있는 페이지 */
        'share-post/list': undefined;
        'share-post/detail': SharePostDetailProps;

        /** Bottom Tab이 없는 페이지 */
        'share-post/modal/detail': SharePostDetailProps;
        'share-post/modal/image-crop': undefined;
        'share-post/modal/write': undefined;

        /** Bottom Sheet */
        'share-post/bottom-sheet/comment': SharePostCommentProps;
        'share-post/bottom-sheet/kebab-menu': SharePostKebabMenu;
    };

    type SharePostRouteProp<RouteName extends keyof SharePostParamList> = RouteProp<SharePostParamList, RouteName>;

    type SharePostNavigationProp<RouteName extends keyof SharePostParamList> = NativeStackNavigationProp<
        SharePostParamList,
        RouteName
    >;
}
