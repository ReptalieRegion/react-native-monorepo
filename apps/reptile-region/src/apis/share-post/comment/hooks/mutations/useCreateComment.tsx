import { useMutation } from '@tanstack/react-query';

import { createComment } from '../../repository';

import type { CreateCommentRequest } from '<SharePostCommentAPI>';

const useCreateComment = () => {
    return useMutation({
        mutationFn: ({ postId, contents, tagIds }: CreateCommentRequest) => createComment({ postId, contents, tagIds }),
    });
};

export default useCreateComment;
