import { Alert } from 'react-native';

import useDeleteCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useDeleteCommentReply';
import { useTagHandler } from '@/components/@common/organisms/TagTextInput';

const useCommentReplyActions = () => {
    const { changeText, tagTextInputFocus } = useTagHandler();
    const deleteMutate = useDeleteCommentReply();

    const handleDeleteButton = (commentReplyId: string) => {
        Alert.alert('정말로 삭제 하시겠어요?', '', [
            {
                text: '취소',
                style: 'cancel',
                onPress: () => {},
            },
            {
                text: '삭제',
                onPress: () => deleteMutate.mutate({ commentReplyId }),
            },
        ]);
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
};

export default useCommentReplyActions;
