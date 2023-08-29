import { useMutation } from '@tanstack/react-query';

import { deletePost } from '../../repository';

import type { DeletePostRequest } from '<SharePostAPI>';

const useDeletePost = ({ postId }: DeletePostRequest) => {
    return useMutation({
        mutationKey: [''],
        mutationFn: () => deletePost({ postId }),
    });
};

export default useDeletePost;
