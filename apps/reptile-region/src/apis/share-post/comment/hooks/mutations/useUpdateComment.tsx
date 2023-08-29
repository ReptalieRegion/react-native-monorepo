import { useMutation } from '@tanstack/react-query';

import { updateComment } from '../../repository';

import type { UpdateCommentRequest } from '<SharePostCommentAPI>';

const useUpdateComment = ({ commentId, contents, tagIds }: UpdateCommentRequest) => {
    return useMutation({
        mutationFn: () => updateComment({ commentId, contents, tagIds }),
    });
};

export default useUpdateComment;
