import { useMutation } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type { UpdateCommentRequest } from '<SharePostCommentAPI>';

const useUpdateComment = () => {
    return useMutation({
        mutationFn: ({ commentId, contents }: UpdateCommentRequest) => updateComment({ commentId, contents }),
    });
};

export default useUpdateComment;
