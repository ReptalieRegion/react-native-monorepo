import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

import { createFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateFollow } from '@/types/apis/share-post/user';

export type UseCreateFollowProps<TContext> = Pick<
    UseMutationOptions<CreateFollow['Response'], HTTPError, CreateFollow['Request'], TContext>,
    'onMutate' | 'onError' | 'onSettled'
>;

export default function useBaseCreateFollow<TContext = unknown>(props?: UseCreateFollowProps<TContext>) {
    return useMutation<CreateFollow['Response'], HTTPError, CreateFollow['Request'], TContext>({
        mutationFn: ({ userId }) => createFollow({ userId }),
        ...props,
    });
}
