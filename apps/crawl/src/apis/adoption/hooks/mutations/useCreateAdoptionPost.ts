import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { createAdoptionPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreateAdoptionPost } from '@/types/apis/adoption';

export type UseCreateAdoptionPostProps<TContext> = Pick<
    UseMutationOptions<CreateAdoptionPost['Response'], HTTPError, CreateAdoptionPost['Request'], TContext>,
    'onError' | 'onMutate' | 'onSettled'
>;

// 좋아요 생성
export default function useCreateAdoptionPost<TContext = unknown>(props?: UseCreateAdoptionPostProps<TContext>) {
    return useMutation<CreateAdoptionPost['Response'], HTTPError, CreateAdoptionPost['Request'], TContext>({
        mutationFn: ({ contents, files, gender, location, size, title, variety }) =>
            createAdoptionPost({ contents, files, gender, location, size, title, variety }),
        ...props,
    });
}
