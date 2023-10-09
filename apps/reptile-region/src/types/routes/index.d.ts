declare module '<routes/root>' {
    import { NavigatorScreenParams } from '@react-navigation/native';

    import { ImageType } from '<image>';
    import { BottomTabNativeStackParamList } from '<routes/bottom-tab>';

    /** SharePost 시작 */
    /** SharePost 글쓰기 시작 */
    type SharePostPostingParamList = {
        'image-crop': undefined;
        write: undefined;
    };
    /** SharePost 글쓰기 끝 */

    type SharePostDetailProps = {
        nickname: string;
        profile: ImageType;
        isFollow: boolean | undefined;
    };

    type SharePostUserListProps = {
        nickname: string;
        startIndex: number;
    };

    type SharePostPostingUpdateProps = {
        post: {
            id: string;
            images: ImageType[];
            contents: string;
        };
    };

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
    /** SharePost 끝 */

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

    type SharePostModalParamList = {
        detail: SharePostDetailProps;
        'list/user': SharePostUserListProps;
        'posting/update': SharePostPostingUpdateProps;
        'bottom-sheet/comment': NavigatorScreenParams<SharePostCommentParamList>;
        'bottom-sheet/post-options-menu': SharePostOptionsMenuProps;
    };

    type RootRoutesParamList = {
        'bottom-tab/routes': NavigatorScreenParams<BottomTabNativeStackParamList>;
        'sign-in': undefined;
        'sign-up': undefined;
        'share-post/modal': NavigatorScreenParams<SharePostModalParamList>;
        'share-post/modal/posting': NavigatorScreenParams<SharePostPostingParamList>;
    };
}
