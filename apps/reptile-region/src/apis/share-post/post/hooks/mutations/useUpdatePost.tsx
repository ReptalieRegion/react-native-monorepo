import { useMutation } from '@tanstack/react-query';

import { updatePost } from '../../repository';

import type { UpdatePostRequest } from '<SharePostAPI>';

const useUpdatePost = ({ postId, contents, files, tagIds }: UpdatePostRequest) => {
    return useMutation({
        mutationKey: [''],
        mutationFn: () => updatePost({ postId, contents, files, tagIds }),
    });
};

export default useUpdatePost;
