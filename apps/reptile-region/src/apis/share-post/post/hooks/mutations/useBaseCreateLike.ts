import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { createLike } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import type { CreateLike, CreateLikeResponse } from '@/types/apis/share-post/post';

export type UseCreateLikeProps<TContext> = Pick<
    UseMutationOptions<CreateLike['Response'], HTTPError, CreateLike['Request'], TContext>,
    'onError' | 'onMutate' | 'onSettled'
>;

// 좋아요 생성
export default function useBaseCreateLike<TContext = unknown>(props?: UseCreateLikeProps<TContext>) {
    const queryClient = useQueryClient();

    return useMutation<CreateLike['Response'], HTTPError, CreateLike['Request'], TContext>({
        mutationFn: ({ postId }) => createLike({ postId }),
        onSettled: useCallback(
            (data: CreateLikeResponse | undefined) => {
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
