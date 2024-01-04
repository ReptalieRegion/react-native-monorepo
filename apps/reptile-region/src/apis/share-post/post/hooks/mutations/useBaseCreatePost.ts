import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { CreatePost } from '@/types/apis/share-post/post';

export default function useBaseCreatePost<Context = unknown>(
    props?: Pick<
        UseMutationOptions<CreatePost['Response'], HTTPError, CreatePost['Request'], Context>,
        'onSuccess' | 'onMutate' | 'onSettled' | 'onError'
    >,
) {
    return useMutation<CreatePost['Response'], HTTPError, CreatePost['Request'], Context>({
        mutationFn: ({ contents, selectedPhotos }) => createPost({ contents, selectedPhotos }),
        ...props,
    });
}
