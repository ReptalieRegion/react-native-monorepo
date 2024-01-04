import { useCallback } from 'react';

import useCreateCommentReply from './mutations/useCreateCommentReply';
import useUpdateCommentReply from './mutations/useUpdateCommentReply';

import useAuthNavigation from '@/hooks/auth/useNavigationAuth';
import useComment from '@/pages/share-post/@common/contexts/Comment/hooks/useComment';

export default function useCreateOrUpdateCommentReply(postId: string) {
    const { id, submitType } = useComment();
    const createCommentReplyAPI = useCreateCommentReply(postId);
    const updateCommentReplyAPI = useUpdateCommentReply(postId);

    const { requireAuthNavigation } = useAuthNavigation();

    const createMutate = useCallback(
        (contents: string) => {
            requireAuthNavigation(() => createCommentReplyAPI.mutate({ commentId: id, contents }));
        },
        [createCommentReplyAPI, id, requireAuthNavigation],
    );

    const updateMutate = useCallback(
        (contents: string) => {
            requireAuthNavigation(() => updateCommentReplyAPI.mutate({ commentReplyId: id, contents }));
        },
        [id, requireAuthNavigation, updateCommentReplyAPI],
    );

    return submitType === 'CREATE'
        ? {
              ...createCommentReplyAPI,
              mutate: createMutate,
          }
        : {
              ...updateCommentReplyAPI,
              mutate: updateMutate,
          };
}
