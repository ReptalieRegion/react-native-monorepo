import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';
import useAlert from '@/components/overlay/Alert/useAlert';

export default function useCommentReplyActions() {
    const { changeText, tagTextInputFocus } = useTagHandler();
    const openAlert = useAlert();
    const deleteMutate = useDeleteCommentReply();

    const handleDeleteButton = (commentReplyId: string) => {
        openAlert({
            contents: '정말로 삭제하시겠어요?',
            buttons: [
                {
                    text: '취소',
                    style: 'cancel',
                },
                {
                    text: '삭제',
                    onPress: () => deleteMutate.mutate({ commentReplyId }),
                },
            ],
        });
    };

    // TODO 신고하기
    const handlePressDeclarationButton = () => {};

    // TODO 수정하기
    const handlePressUpdateButton = () => {};

    const handlePressWriteButton = (nickname: string) => {
        changeText(`@${nickname} `);
        tagTextInputFocus();
    };

    return {
        handleDeleteButton,
        handlePressDeclarationButton,
        handlePressUpdateButton,
        handlePressWriteButton,
    };
}
