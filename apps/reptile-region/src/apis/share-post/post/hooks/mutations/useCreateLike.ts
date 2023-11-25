import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateLike } from '@/types/apis/share-post/post';

export type UseCreateLikeProps = Pick<
    UseMutationOptions<CreateLike['Response'], HTTPError, CreateLike['Request']>,
    'onError' | 'onMutate'
>;

// 좋아요 생성
export default function useCreateLike(props?: UseCreateLikeProps) {
    const queryClient = useQueryClient();

    return useMutation<CreateLike['Response'], HTTPError, CreateLike['Request']>({
        mutationFn: ({ postId }) => createLike({ postId }),
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
