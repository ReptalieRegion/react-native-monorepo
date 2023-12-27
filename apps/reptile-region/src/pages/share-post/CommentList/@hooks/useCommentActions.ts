import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';
import useAlert from '@/components/overlay/Alert/useAlert';

export default function useCommentActions() {
    const deleteMutate = useDeleteComment();
    const openAlert = useAlert();

    const handleDeleteButton = (commentId: string) => {
        openAlert({
            contents: '정말로 삭제하시겠어요?',
            buttons: [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '삭제',
                    onPress: () => deleteMutate.mutate({ commentId }),
                },
            ],
        });
    };

    // TODO 신고하기
    const handlePressDeclarationButton = () => {};

    // TODO 수정하기
    const handlePressUpdateButton = () => {};

    return {
        handleDeleteButton,
        handlePressDeclarationButton,
        handlePressUpdateButton,
    };
}
