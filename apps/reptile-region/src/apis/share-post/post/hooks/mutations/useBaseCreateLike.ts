import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { createLike } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateLike } from '@/types/apis/share-post/post';

export type UseCreateLikeProps<TContext> = Pick<
    UseMutationOptions<CreateLike['Response'], HTTPError, CreateLike['Request'], TContext>,
    'onError' | 'onMutate' | 'onSettled'
>;

// 좋아요 생성
export default function useBaseCreateLike<TContext = unknown>(props?: UseCreateLikeProps<TContext>) {
    return useMutation<CreateLike['Response'], HTTPError, CreateLike['Request'], TContext>({
        mutationFn: ({ postId }) => createLike({ postId }),
        ...props,
    });
}
