declare module '<SharePostComponent>' {
    type FloatingActionButtonSize = {
        width: number;
        height: number;
    };

    interface SharePostListNavigationProps {
        navigateDetailPage: (props: { nickname: string }) => void;
        navigateCommentPage: (props: { post: { id: string } }) => void;
        navigateBottomSheetKebabMenu: (props: { post: { id: string; isMine: boolean }; user: { id: string } }) => void;
    }
}
