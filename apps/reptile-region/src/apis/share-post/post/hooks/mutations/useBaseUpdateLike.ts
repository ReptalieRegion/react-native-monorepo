import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';

import { updateLike } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateLike } from '@/types/apis/share-post/post';

export type UseUpdateLikeProps<TContext> = Pick<
    UseMutationOptions<UpdateLike['Response'], HTTPError, UpdateLike['Request'], TContext>,
    'onError' | 'onMutate' | 'onSettled'
>;

// 사용자 게시물 좋아요 토글
export default function useBaseUpdateLike<TContext = unknown>(props?: UseUpdateLikeProps<TContext>) {
    const queryClient = useQueryClient();

    return useMutation<UpdateLike['Response'], HTTPError, UpdateLike['Request'], TContext>({
        mutationFn: ({ postId }) => updateLike({ postId }),
        onSettled: (data, _error) => {
            if (data) {
                queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                queryClient.invalidateQueries({
                    queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname),
                    exact: true,
                });
                queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.likeList(data.post.id), exact: true });
            }
        },
        ...props,
    });
}
