declare module '<routes/root>' {
    import { NavigatorScreenParams } from '@react-navigation/native';

    import { ImageType } from '<image>';
    import { BottomTabNativeStackParamList } from '<routes/bottom-tab>';
    import type { SignUpParamList } from '<routes/sign-up>';
    import { SharePostTopTabParamList } from '<routes/top-tab>';

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

    /** 게시물 수정 시작 */
    type SharePostUpdatePost = {
        post: {
            id: string;
            images: ImageType[];
            contents: string;
        };
    };
    /** 게시물 수정 끝 */

    type SharePostFollowProps = {
        initialRouteName: keyof SharePostTopTabParamList;
        userId: string;
        nickname: string;
        followerCount: number;
        followingCount: number;
    };

    type SharePostLikeProps = {
        postId: string;
    };

    type DetailPostProps = {
        postId: string;
        type: 'comment' | 'like';
    };

    type SharePostModalParamList = {
        'notification/detail': DetailPostProps;
        detail: SharePostDetailProps;
        'list/user': SharePostUserListProps;
        'posting/update': SharePostPostingUpdateProps;
        'bottom-sheet/comment': NavigatorScreenParams<SharePostCommentParamList>;
        'share-post/list/follow': SharePostFollowProps;
        'share-post/list/like': SharePostLikeProps;
    };

    type LicenseContentsProps = {
        libraryName: string;
        description?: string;
        licenseType: string;
        licenseContent: string;
        homepage?: string;
    };

    type SignInProps = {
        isGoBack: boolean;
    };

    type RootRoutesParamList = {
        'bottom-tab/routes': NavigatorScreenParams<BottomTabNativeStackParamList>;
        /** auth 시작 */
        'sign-in'?: SignInProps;
        'sign-up': NavigatorScreenParams<SignUpParamList>;
        /** auth 끝 */

        /** my 시작 */
        'my/license': undefined;
        'my/terms-of-use': undefined;
        'my/terms-privacy-policy': undefined;
        'my/license/contents': LicenseContentsProps;
        'my/profile': undefined;
        'my/notification-setting': undefined;
        'my/notification-log': undefined;
        /** my 끝 */

        /** share post 시작 */
        'share-post/modal': NavigatorScreenParams<SharePostModalParamList>;
        'share-post/modal/posting': NavigatorScreenParams<SharePostPostingParamList>;
        'share-post/bottom-sheet/post-options-menu': SharePostOptionsMenuProps;
        'share-post/post/update': SharePostUpdatePost;
        /** share post 끝 */
    };
}
