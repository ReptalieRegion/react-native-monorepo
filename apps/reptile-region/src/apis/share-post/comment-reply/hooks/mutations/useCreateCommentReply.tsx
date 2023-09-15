import { useMutation } from '@tanstack/react-query';

import { createCommentReply } from '../../repository';

import { CreateCommentReplyRequest, CreateCommentReplyResponse } from '<SharePostCommentReplyAPI>';

const useCreateCommentReply = () => {
    return useMutation<CreateCommentReplyResponse, any, CreateCommentReplyRequest>({
        mutationFn: ({ commentId, contents }) => createCommentReply({ commentId, contents }),
    });
};

export default useCreateCommentReply;
