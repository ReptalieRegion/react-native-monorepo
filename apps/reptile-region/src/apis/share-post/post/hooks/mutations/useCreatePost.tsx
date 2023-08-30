import { useMutation } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { CreatePostRequest } from '<SharePostAPI>';

const useCreatePost = () => {
    return useMutation({
        mutationKey: [''],
        mutationFn: ({ contents, files, tagIds }: CreatePostRequest) => createPost({ contents, files, tagIds }),
    });
};

export default useCreatePost;
