import { useMutation } from '@tanstack/react-query';

import { deleteComment } from '../../repository';

import type { DeleteCommentRequest } from '<SharePostCommentAPI>';

const useDeleteComment = ({ commentId }: DeleteCommentRequest) => {
    return useMutation({
        mutationFn: () => deleteComment({ commentId }),
    });
};

export default useDeleteComment;
