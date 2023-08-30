import { useMutation } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type { UpdateCommentRequest } from '<SharePostCommentAPI>';

const useUpdateComment = () => {
    return useMutation({
        mutationFn: ({ commentId, contents, tagIds }: UpdateCommentRequest) => updateComment({ commentId, contents, tagIds }),
    });
};

export default useUpdateComment;
