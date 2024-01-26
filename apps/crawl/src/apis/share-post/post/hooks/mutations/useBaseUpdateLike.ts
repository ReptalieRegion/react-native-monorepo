import { useMutation, useQueryClient, type UseMutationOptions } from '@tanstack/react-query';
import { useCallback } from 'react';

import { updateLike } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { UpdateLike, UpdateLikeResponse } from '@/types/apis/share-post/post';

export type UseUpdateLikeProps<TContext> = Pick<
    UseMutationOptions<UpdateLike['Response'], HTTPError, UpdateLike['Request'], TContext>,
    'onError' | 'onMutate'
>;

// 사용자 게시물 좋아요 토글
export default function useBaseUpdateLike<TContext = unknown>(props?: UseUpdateLikeProps<TContext>) {
    const queryClient = useQueryClient();

    return useMutation<UpdateLike['Response'], HTTPError, UpdateLike['Request'], TContext>({
        mutationFn: ({ postId }) => updateLike({ postId }),
        onSettled: useCallback(
            (data: UpdateLikeResponse | undefined) => {
                if (data) {
                    // 일상 공유 리스트, 특정 유저 일상공유 리스트, 좋아요 리스트 캐시 무효화
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.list, exact: true });
                    queryClient.invalidateQueries({
                        queryKey: SHARE_POST_QUERY_KEYS.detailUserPosts(data.post.user.nickname),
                        exact: true,
                    });
                    queryClient.invalidateQueries({ queryKey: SHARE_POST_QUERY_KEYS.likeList(data.post.id), exact: true });
                }
            },
            [queryClient],
        ),
        ...props,
    });
}
