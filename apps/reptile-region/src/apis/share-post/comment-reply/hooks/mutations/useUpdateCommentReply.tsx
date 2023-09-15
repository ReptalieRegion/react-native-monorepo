import { useMutation } from '@tanstack/react-query';

import { updateCommentReply } from '../../repository';

import { UpdateCommentReplyRequest, UpdateCommentReplyResponse } from '<SharePostCommentReplyAPI>';

const useUpdateCommentReply = () => {
    return useMutation<UpdateCommentReplyResponse, any, UpdateCommentReplyRequest>({
        mutationFn: ({ commentReplyId, contents }) => updateCommentReply({ commentReplyId, contents }),
    });
};

export default useUpdateCommentReply;
