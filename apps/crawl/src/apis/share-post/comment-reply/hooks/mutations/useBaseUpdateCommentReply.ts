import type { UseMutationOptions } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

import { updateCommentReply } from '../../repository';

import type HTTPError from '@/apis/@utils/error/HTTPError';
import type { UpdateCommentReply } from '@/types/apis/share-post/comment-reply';

export default function useBaseUpdateCommentReply<TContext = unknown>(
    props?: Pick<
        UseMutationOptions<UpdateCommentReply['Response'], HTTPError, UpdateCommentReply['Request'], TContext>,
        'onError' | 'onMutate' | 'onSettled' | 'onSuccess'
    >,
) {
    return useMutation<UpdateCommentReply['Response'], HTTPError, UpdateCommentReply['Request'], TContext>({
        mutationFn: ({ commentReplyId, contents }) => updateCommentReply({ commentReplyId, contents }),
        ...props,
    });
}
