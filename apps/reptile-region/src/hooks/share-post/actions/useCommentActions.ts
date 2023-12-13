import { Alert } from 'react-native';

import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';

export default function useCommentActions() {
    const deleteMutate = useDeleteComment();

    const handleDeleteButton = (commentId: string) => {
        Alert.alert('정말로 삭제 하시겠어요?', '', [
            {
                text: '취소',
                style: 'cancel',
                onPress: () => {},
            },
            {
                text: '삭제',
                style: 'destructive',
                onPress: () => deleteMutate.mutate({ commentId }),
            },
        ]);
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
