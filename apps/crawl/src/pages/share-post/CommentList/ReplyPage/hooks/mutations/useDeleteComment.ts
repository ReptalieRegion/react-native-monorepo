import { useNavigation } from '@react-navigation/native';

import useBaseDeleteComment from '@/apis/share-post/comment/hooks/mutations/useBaseDeleteComment';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import type { CommentReplyNavigationProp } from '@/types/routes/props/share-post/comment';

export default function useDeleteComment() {
    const navigation = useNavigation<CommentReplyNavigationProp>();
    const { openLoading, closeLoading } = useGlobalLoading();

    return useBaseDeleteComment({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: () => {
            navigation.goBack();
        },
    });
}
