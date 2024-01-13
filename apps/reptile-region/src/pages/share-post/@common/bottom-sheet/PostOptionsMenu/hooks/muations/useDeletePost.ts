import useBaseDeletePost from '@/apis/share-post/post/hooks/mutations/useBaseDeletePost';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';

type UseDeletePostProps = {
    onSuccess?(): void;
};

export default function useDeletePost({ onSuccess }: UseDeletePostProps) {
    const { openLoading, closeLoading } = useGlobalLoading();
    return useBaseDeletePost({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess,
    });
}
