import { useCallback } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateLike from '@/apis/share-post/post/hooks/mutations/useCreateLike';
import useUpdateLike from '@/apis/share-post/post/hooks/mutations/useUpdateLike';
import useCreateFollow from '@/apis/share-post/user/hooks/mutations/useCreateFollow';
import useUpdateFollow from '@/apis/share-post/user/hooks/mutations/useUpdateFollow';

const useSharePostActions = () => {
    const { mutate: createLikeMutate } = useCreateLike();
    const { mutate: updateLikeMutate } = useUpdateLike();
    const { mutate: createFollowMutate } = useCreateFollow();
    const { mutate: updateFollowMutate } = useUpdateFollow();

    const handlePressHeart = useCallback(
        ({ isLike, postId }: { isLike: boolean | undefined; postId: string }) => {
            if (isLike === undefined) {
                createLikeMutate({ postId });
            } else {
                updateLikeMutate({ postId });
            }
            Haptic.trigger('impactLight');
        },
        [createLikeMutate, updateLikeMutate],
    );

    const handleDoublePressImageCarousel = useCallback(
        ({ isLike, postId }: { isLike: boolean | undefined; postId: string }) => {
            if (isLike === undefined) {
                createLikeMutate({ postId });
            } else if (!isLike) {
                updateLikeMutate({ postId });
            }
            Haptic.trigger('impactLight');
        },
        [createLikeMutate, updateLikeMutate],
    );

    const handlePressFollow = useCallback(
        ({ userId, isFollow }: { userId: string; isFollow: boolean | undefined }) => {
            if (isFollow === undefined) {
                createFollowMutate({ userId });
            } else {
                updateFollowMutate({ userId });
            }
            Haptic.trigger('impactLight');
        },
        [createFollowMutate, updateFollowMutate],
    );

    return {
        handlePressHeart,
        handleDoublePressImageCarousel,
        handlePressFollow,
    };
};

export default useSharePostActions;
