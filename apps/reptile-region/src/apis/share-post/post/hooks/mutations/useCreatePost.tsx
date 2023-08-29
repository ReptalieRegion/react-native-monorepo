import { useMutation } from '@tanstack/react-query';

import { createPost } from '../../repository';

import type { CreatePostRequest } from '<SharePostAPI>';

const useCreatePost = ({ contents, files, tagIds }: CreatePostRequest) => {
    return useMutation({
        mutationKey: [''],
        mutationFn: () => createPost({ contents, files, tagIds }),
    });
};

export default useCreatePost;
