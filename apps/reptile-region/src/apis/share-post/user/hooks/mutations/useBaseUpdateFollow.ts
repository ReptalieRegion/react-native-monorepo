import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { updateFollow } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateFollow } from '@/types/apis/share-post/user';

export type UseUpdateFollowProps<TContext> = Pick<
    UseMutationOptions<UpdateFollow['Response'], HTTPError, UpdateFollow['Request'], TContext>,
    'onMutate' | 'onError' | 'onSettled'
>;

export default function useBaseUpdateFollow<TContext = unknown>(props?: UseUpdateFollowProps<TContext>) {
    return useMutation<UpdateFollow['Response'], HTTPError, UpdateFollow['Request'], TContext>({
        mutationFn: ({ userId }) => updateFollow({ userId }),
        ...props,
    });
}
