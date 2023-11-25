import { useCallback } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateLike, { type UseCreateLikeProps } from '../mutations/useCreateLike';
import useUpdateLike, { type UseUpdateLikeProps } from '../mutations/useUpdateLike';

type UseOnlyLikeProps = {
    create?: UseCreateLikeProps;
    update?: UseUpdateLikeProps;
};

export default function useOnlyLike(props?: UseOnlyLikeProps) {
    const { mutate: createLikeMutate } = useCreateLike(props?.create);
    const { mutate: updateLikeMutate } = useUpdateLike(props?.update);

    const mutateOnlyLike = useCallback(
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

    return { mutateOnlyLike };
}
