import { useMutation } from '@tanstack/react-query';

import { updatePost } from '../../repository';

import type { UpdatePostRequest } from '<SharePostAPI>';

const useUpdatePost = () => {
    return useMutation({
        mutationFn: ({ postId, contents, files }: UpdatePostRequest) => updatePost({ postId, contents, files }),
    });
};

export default useUpdatePost;
