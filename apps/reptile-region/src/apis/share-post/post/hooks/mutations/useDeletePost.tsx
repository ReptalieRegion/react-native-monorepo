import { useMutation } from '@tanstack/react-query';

import { deletePost } from '../../repository';

import type { DeletePostRequest } from '<SharePostAPI>';

const useDeletePost = () => {
    return useMutation({
        mutationKey: [''],
        mutationFn: ({ postId }: DeletePostRequest) => deletePost({ postId }),
    });
};

export default useDeletePost;
