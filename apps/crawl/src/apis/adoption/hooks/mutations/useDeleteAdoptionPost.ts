import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { deleteAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { DeleteAdoptionPost } from '@/types/apis/adoption';

export type UseDeleteAdoptionPostProps<TContext> = Pick<
    UseMutationOptions<DeleteAdoptionPost['Response'], HTTPError, DeleteAdoptionPost['Request'], TContext>,
    'onError' | 'onMutate' | 'onSettled'
>;

// 좋아요 생성
export default function useDeleteAdoptionPost<TContext = unknown>(props?: UseDeleteAdoptionPostProps<TContext>) {
    return useMutation<DeleteAdoptionPost['Response'], HTTPError, DeleteAdoptionPost['Request'], TContext>({
        mutationFn: ({ adoptionId }) => deleteAdoptionPost({ adoptionId }),
        ...props,
    });
}
