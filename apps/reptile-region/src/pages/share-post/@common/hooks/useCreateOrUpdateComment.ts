import { useCallback } from 'react';

import useComment from '../contexts/Comment/hooks/useComment';

import useCreateComment from './mutations/useCreateComment';
import useUpdateComment from './mutations/useUpdateComment';

import useAuthNavigation from '@/hooks/auth/useNavigationAuth';

export default function useCreateOrUpdateComment() {
    const { id, submitType } = useComment();
    const createCommentAPI = useCreateComment();
    const updateCommentAPI = useUpdateComment();

    const { requireAuthNavigation } = useAuthNavigation();

    const createMutate = useCallback(
        (contents: string) => {
            requireAuthNavigation(() => createCommentAPI.mutate({ postId: id, contents }));
        },
        [createCommentAPI, id, requireAuthNavigation],
    );

    const updateMutate = useCallback(
        (contents: string) => {
            requireAuthNavigation(() => updateCommentAPI.mutate({ commentId: id, contents }));
        },
        [id, requireAuthNavigation, updateCommentAPI],
    );

    return submitType === 'CREATE'
        ? {
              ...createCommentAPI,
              mutate: createMutate,
          }
        : {
              ...updateCommentAPI,
              mutate: updateMutate,
          };
}
