declare module '<RootRoutes>' {
    import type { NavigatorScreenParams } from '@react-navigation/native';

    import type { HomeParamList } from '<HomeRoutes>';
    import { ImageType } from '<image>';
    import { ShareImageType } from '<Image>';
    import type { InfoParamList } from '<InfoRoutes>';
    import type { MyParamList } from '<MyRoutes>';
    import type { SharePostParamList } from '<SharePostRoutes>';
    import type { ShopParamList } from '<ShopRoutes>';

    /** SharePost Start */
    /** Posting Route Start */
    type SharePostPostingParamList = {
        'image-crop': undefined;
        write: undefined;
    };
    /** Posting Route End */

    /** Comment Route Start */
    type SharePostCommentParams = {
        post: {
            id: string;
        };
    };

    type SharePostCommentReplyParams = {
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

    type SharePostCommentParamList = {
        main: SharePostCommentParams;
        reply: SharePostCommentReplyParams;
    };
    /** Comment Route End */

    /** SharePost Main Routes Start */
    type SharePostKebabMenuParams = {
        post: {
            id: string;
            images: ImageType[];
            contents: string;
            isMine: boolean;
        };
        user: {
            id: string;
        };
    };

    type SharePostDetailParams = {
        nickname: string;
        profile: ImageType;
        isFollow: boolean | undefined;
    };

    type SharePostUserListParams = {
        nickname: string;
        startIndex: number;
    };

    type SharePostParamList = {
        // Bottom Tab이 있는 페이지
        'share-post/list': undefined;
        'share-post/detail': SharePostDetailParams;
        'share-post/list/user': SharePostUserListParams;

        // Bottom Tab이 없는 페이지
        'share-post/modal/detail': SharePostDetailParams;
        'share-post/modal/posting': NavigatorScreenParams<SharePostPostingParamList>;
        'share-post/modal/list/user': SharePostUserListParams;

        // Bottom Sheet
        'share-post/bottom-sheet/comment': NavigatorScreenParams<SharePostCommentParamList>;
        'share-post/bottom-sheet/kebab-menu': SharePostKebabMenu;
    };
    /** SharePost Main Routes End */
    /** SharePost End */

    /** RootRoutes Start */
    type RootRoutesParamList = {
        'home/routes': NavigatorScreenParams<HomeParamList>;
        'shop/routes': NavigatorScreenParams<ShopParamList>;
        'share-post/routes': NavigatorScreenParams<SharePostParamList>;
        'info/routes': NavigatorScreenParams<InfoParamList>;
        'my/routes': NavigatorScreenParams<MyParamList>;
    };
    /** RootRoutes End */
}
