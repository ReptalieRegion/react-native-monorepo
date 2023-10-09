declare module '<routes/bottom-tab>' {
    import { NavigatorScreenParams } from '@react-navigation/native';

    import { ImageType } from '<image>';

    /** SharePost 시작 */
    /** 댓글 시작 */
    type SharePostCommentProps = {
        post: {
            id: string;
        };
    };

    type SharePostCommentReplyProps = {
        comment: {
            id: string;
            contents: string;
            isMine: boolean;
            isModified: boolean;
            user: {
                id: string;
                profile: ImageType;
                nickname: string;
            };
        };
        isFocus: boolean;
    };

    type SharePostCommentParamList = {
        main: SharePostCommentProps;
        reply: SharePostCommentReplyProps;
    };
    /** 댓글 끝 */

    /** 게시물 옵션 메뉴 시작 */
    type SharePostOptionsMenuProps = {
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
    /** 게시물 옵션 메뉴 끝 */
    /** SharePost 끝 */

    type BottomTabBottomSheetParamList = {
        'share-post/comment': NavigatorScreenParams<SharePostCommentParamList>;
        'share-post/post-options-menu': SharePostOptionsMenuProps;
    };

    /** HOME 시작 */
    type HomeTabParamList = {
        'home/list': undefined;
    };
    /** HOME 끝 */

    /** INFO 시작 */
    type InfoTabParamList = {
        'info/list': undefined;
    };
    /** INFO 끝 */

    /** MY 시작 */
    type MyTabParamList = {
        'my/list': undefined;
    };
    /** MY 끝 */

    /** SharePost 시작 */
    type SharePostDetailProps = {
        nickname: string;
        profile: ImageType;
        isFollow: boolean | undefined;
    };

    type SharePostUserListProps = {
        nickname: string;
        startIndex: number;
    };

    type SharePostTabParamList = {
        'share-post/list': undefined;
        'share-post/detail': SharePostDetailProps;
        'share-post/list/user': SharePostUserListProps;
    };
    /** SharePost 끝 */

    /** Shop 시작 */
    type ShopTabParamList = {
        'shop/list': undefined;
    };
    /** Shop 끝 */

    type BottomTabParamList = {
        'home/routes': NavigatorScreenParams<HomeTabParamList>;
        'info/routes': NavigatorScreenParams<InfoTabParamList>;
        'my/routes': NavigatorScreenParams<MyTabParamList>;
        'share-post/routes': NavigatorScreenParams<SharePostTabParamList>;
        'shop/routes': NavigatorScreenParams<ShopTabParamList>;
    };

    type BottomTabNativeStackParamList = {
        tab: NavigatorScreenParams<BottomTabParamList>;
        'bottom-sheet/comment': NavigatorScreenParams<SharePostCommentParamList>;
        'bottom-sheet/post-options-menu': SharePostOptionsMenuProps;
    };
}