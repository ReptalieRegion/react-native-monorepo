import { useMutation } from '@tanstack/react-query';

import { deleteComment } from '../../repository';

import type { DeleteCommentRequest } from '<SharePostCommentAPI>';

const useDeleteComment = () => {
    return useMutation({
        mutationFn: ({ commentId }: DeleteCommentRequest) => deleteComment({ commentId }),
    });
};

export default useDeleteComment;
