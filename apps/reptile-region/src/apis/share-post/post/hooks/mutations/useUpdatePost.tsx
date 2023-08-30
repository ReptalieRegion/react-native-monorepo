import { useMutation } from '@tanstack/react-query';

import { updatePost } from '../../repository';

import type { UpdatePostRequest } from '<SharePostAPI>';

const useUpdatePost = () => {
    return useMutation({
        mutationKey: [''],
        mutationFn: ({ postId, contents, files, tagIds }: UpdatePostRequest) => updatePost({ postId, contents, files, tagIds }),
    });
};

export default useUpdatePost;
