import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { updateAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateAdoptionPost } from '@/types/apis/adoption';

export type UseUpdateAdoptionPostProps<TContext> = Pick<
    UseMutationOptions<UpdateAdoptionPost['Response'], HTTPError, UpdateAdoptionPost['Request'], TContext>,
    'onError' | 'onMutate' | 'onSettled'
>;

// 좋아요 생성
export default function useUpdateAdoptionPost<TContext = unknown>(props?: UseUpdateAdoptionPostProps<TContext>) {
    return useMutation<UpdateAdoptionPost['Response'], HTTPError, UpdateAdoptionPost['Request'], TContext>({
        mutationFn: ({ adoptionId, contents, files, gender, location, size, title, variety }) =>
            updateAdoptionPost({ adoptionId, contents, files, gender, location, size, title, variety }),
        ...props,
    });
}
