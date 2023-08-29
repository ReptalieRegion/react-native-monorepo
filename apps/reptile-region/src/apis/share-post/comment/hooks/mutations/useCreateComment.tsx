import { useMutation } from '@tanstack/react-query';

import { createComment } from '../../repository';

import type { CreateCommentRequest } from '<SharePostCommentAPI>';

const useCreateComment = ({ postId, contents, tagIds }: CreateCommentRequest) => {
    return useMutation({
        mutationFn: () => createComment({ postId, contents, tagIds }),
    });
};

export default useCreateComment;
