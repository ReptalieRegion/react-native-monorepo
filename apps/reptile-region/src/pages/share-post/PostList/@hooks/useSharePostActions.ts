import { useCallback, useMemo } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from './mutations/useCreateFollow';
import useCreateLike from './mutations/useCreateLike';
import useUpdateFollow from './mutations/useUpdateFollow';
import useUpdateLike from './mutations/useUpdateLike';

import useAuthNavigation from '@/hooks/useNavigationAuth';

export default function useSharePostActions() {
    const { mutate: createLikeMutate } = useCreateLike();
    const { mutate: updateLikeMutate } = useUpdateLike();
    const { mutate: createFollowMutate } = useCreateFollow();
    const { mutate: updateFollowMutate } = useUpdateFollow();
    const { requireAuthNavigation } = useAuthNavigation();

    const onlyLike = useCallback(
        (props: { isLike: boolean | undefined; postId: string }) =>
            requireAuthNavigation(() => {
                Haptic.trigger('impactLight');
                if (props.isLike === undefined) {
                    createLikeMutate({ postId: props.postId });
                } else if (!props.isLike) {
                    updateLikeMutate({ postId: props.postId });
                }
            }),
        [createLikeMutate, requireAuthNavigation, updateLikeMutate],
    );

    const updateOrCreateLike = useCallback(
        (props: { isLike: boolean | undefined; postId: string }) =>
            requireAuthNavigation(() => {
                Haptic.trigger('impactLight');
                if (props.isLike === undefined) {
                    createLikeMutate({ postId: props.postId });
                } else {
                    updateLikeMutate({ postId: props.postId });
                }
            }),
        [createLikeMutate, requireAuthNavigation, updateLikeMutate],
    );

    const updateOrCreateFollow = useCallback(
        ({ userId, isFollow }: { userId: string; isFollow: boolean | undefined }) =>
            requireAuthNavigation(() => {
                if (isFollow === undefined) {
                    createFollowMutate({ userId });
                } else {
                    updateFollowMutate({ userId });
                }
                Haptic.trigger('impactLight');
            }),
        [createFollowMutate, requireAuthNavigation, updateFollowMutate],
    );

    return useMemo(
        () => ({
            onlyLike,
            updateOrCreateLike,
            updateOrCreateFollow,
        }),
        [onlyLike, updateOrCreateFollow, updateOrCreateLike],
    );
}