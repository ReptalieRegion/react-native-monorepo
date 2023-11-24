import { useCallback } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateLike from '@/apis/share-post/post/hooks/mutations/useCreateLike';
import useUpdateLike from '@/apis/share-post/post/hooks/mutations/useUpdateLike';
import useCreateOrUpdateFollow from '@/apis/share-post/user/hooks/combine/useCreateOrUpdateFollow';

const useSharePostActions = () => {
    const { mutate: createLikeMutate } = useCreateLike();
    const { mutate: updateLikeMutate } = useUpdateLike();
    const { mutateFollow } = useCreateOrUpdateFollow();

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

    return {
        handlePressHeart,
        handleDoublePressImageCarousel,
        handlePressFollow: mutateFollow,
    };
};

export default useSharePostActions;
