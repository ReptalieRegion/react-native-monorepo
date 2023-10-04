declare module '<SharePostRoutes>' {
    import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
    import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
    import type { NavigatorScreenParams } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    import { ImageType } from '<image>';
    import { ShareImageType } from '<Image>';
    import { RootRoutesParamList } from '<RootRoutes>';

    /** 게시물 작성 관련 내비게이터 */
    type SharePostPostingUpdateProps = {
        post: {
            id: string;
            images: ImageType[];
            contents: string;
        };
    };

    type SharePostPostingParamList = {
        'image-crop': undefined;
        write: undefined;
        update: SharePostPostingUpdateProps;
    };

    type SharePostPostingRouteProp<RouteName extends keyof SharePostPostingParamList> = RouteProp<
        SharePostPostingParamList,
        RouteName
    >;

    type SharePostPostingNavigationProp<RouteName extends keyof SharePostPostingParamList> = NativeStackNavigationProp<
        SharePostPostingParamList,
        RouteName
    >;

    /** 댓글 관련 내비게이터 */
    type SharePostCommentProps = {
        post: {
            id: string;
        };
    };

    type SharePostCommentReplyProps = {
        comment: {
            id: string;
            contents: string;
            replyCount: number;
            isMine: boolean;
            isModified: boolean;
            user: {
                id: string;
                profile: ShareImageType;
                nickname: string;
            };
        };
        commentingActive?: boolean;
    };

    type SharePostCommentBottomSheetParamList = {
        main: SharePostCommentProps;
        reply: SharePostCommentReplyProps;
    };

    type SharePostCommentBottomSheetRouteProp<RouteName extends keyof SharePostCommentBottomSheetParamList> = RouteProp<
        SharePostCommentBottomSheetParamList,
        RouteName
    >;

    type SharePostCommentBottomSheetNavigationProp<RouteName extends keyof SharePostCommentBottomSheetParamList> =
        NativeStackNavigationProp<SharePostCommentBottomSheetParamList, RouteName>;

    /** 일상공유 전체 내비게이터 */
    type SharePostKebabMenu = {
        post: {
            id: string;
            images: ImageType[];
            contents: string;
            isMine: boolean;
            user: {
                id: string;
            };
        };
    };

    type SharePostDetailProps = {
        nickname: string;
    };

    type SharePostUserList = {
        nickname: string;
        startIndex: number;
    };

    type SharePostParamList = {
        /** Bottom Tab이 있는 페이지 */
        'share-post/list': undefined;
        'share-post/detail': SharePostDetailProps;
        'share-post/list/user': SharePostUserList;

        /** Bottom Tab이 없는 페이지 */
        'share-post/modal/detail': SharePostDetailProps;
        'share-post/modal/posting': NavigatorScreenParams<SharePostPostingParamList>;
        'share-post/modal/list/user': SharePostUserList;

        /** Bottom Sheet */
        'share-post/bottom-sheet/comment': NavigatorScreenParams<SharePostCommentBottomSheetParamList>;
        'share-post/bottom-sheet/post-options-menu': SharePostKebabMenu;
    };

    type SharePostRouteProp<RouteName extends keyof SharePostParamList> = RouteProp<SharePostParamList, RouteName>;

    type SharePostNavigationProp<RouteName extends keyof SharePostParamList> = NativeStackNavigationProp<
        SharePostParamList,
        RouteName
    >;

    type Compose = CompositeNavigationProp<
        BottomTabNavigationProp<RootRoutesParamList>,
        NativeStackNavigationProp<SharePostParamList, 'share-post/bottom-sheet/comment'>
    >;
}
