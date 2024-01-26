import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateComment } from '@/types/apis/share-post/comment';

export default function useBaseUpdateComment<TContext = unknown>(
    props?: UseMutationOptions<UpdateComment['Response'], HTTPError, UpdateComment['Request'], TContext>,
) {
    return useMutation<UpdateComment['Response'], HTTPError, UpdateComment['Request'], TContext>({
        mutationFn: ({ commentId, contents }) => updateComment({ commentId, contents }),
        ...props,
    });
}
