declare module '<SharePostRoutes>' {
    import type { RouteProp } from '@react-navigation/native';
    import type { NavigatorScreenParams } from '@react-navigation/native';
    import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

    import { ShareImageType } from '<Image>';

    /** 게시물 작성 관련 내비게이터 */
    type SharePostPostingParamList = {
        'image-crop': undefined;
        write: undefined;
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
        user: {
            id: string;
            profile: ShareImageType;
            nickname: string;
        };
        comment: {
            id: string;
            contents: string;
            replyCount: number;
            isMine: boolean;
            isModified: boolean;
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
            isMine: boolean;
        };
        user: {
            id: string;
        };
    };

    type SharePostDetailProps = {
        userId?: string;
        nickname: string;
    };

    type SharePostParamList = {
        /** Bottom Tab이 있는 페이지 */
        'share-post/list': undefined;
        'share-post/detail': SharePostDetailProps;

        /** Bottom Tab이 없는 페이지 */
        'share-post/modal/detail': SharePostDetailProps;
        'share-post/modal/posting': NavigatorScreenParams<SharePostPostingParamList>;

        /** Bottom Sheet */
        'share-post/bottom-sheet/comment': NavigatorScreenParams<SharePostCommentBottomSheetParamList>;
        'share-post/bottom-sheet/kebab-menu': SharePostKebabMenu;
    };

    type SharePostRouteProp<RouteName extends keyof SharePostParamList> = RouteProp<SharePostParamList, RouteName>;

    type SharePostNavigationProp<RouteName extends keyof SharePostParamList> = NativeStackNavigationProp<
        SharePostParamList,
        RouteName
    >;
}
