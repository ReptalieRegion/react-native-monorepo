import { useCallback } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateLike, { type UseCreateLikeProps } from '../mutations/useBaseCreateLike';
import useUpdateLike, { type UseUpdateLikeProps } from '../mutations/useBaseUpdateLike';

type UseCreateOrUpdateLike = {
    create?: UseCreateLikeProps;
    update?: UseUpdateLikeProps;
};

export default function useCreateOrUpdateLike(props?: UseCreateOrUpdateLike) {
    const { mutate: createLikeMutate } = useCreateLike(props?.create);
    const { mutate: updateLikeMutate } = useUpdateLike(props?.update);

    const mutateLike = useCallback(
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

    return { mutateLike };
}
