declare module '<SharePostComponent>' {
    import { SharePostCommentParams, SharePostDetailParams, SharePostKebabMenuParams } from '<RootRoutes>';
    type FloatingActionButtonSize = {
        width: number;
        height: number;
    };

    type NavigateDetailPage = (props: SharePostDetailParams) => void;

    type NavigateCommentPage = (props: SharePostCommentParams) => void;

    type NavigateBottomSheetKebabMenu = (props: SharePostKebabMenuParams) => void;

    interface SharePostListNavigationProps {
        navigateDetailPage: NavigateDetailPage;
        navigateCommentPage: NavigateCommentPage;
        navigateBottomSheetKebabMenu: NavigateBottomSheetKebabMenu;
    }
}
