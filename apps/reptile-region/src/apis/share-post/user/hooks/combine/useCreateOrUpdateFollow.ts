import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from '../mutations/useCreateFollow';
import useUpdateFollow from '../mutations/useUpdateFollow';

export default function useCreateOrUpdateFollow() {
    const { mutate: createFollowMutate } = useCreateFollow();
    const { mutate: updateFollowMutate } = useUpdateFollow();

    const mutateFollow = ({ userId, isFollow }: { userId: string; isFollow: boolean | undefined }) => {
        if (isFollow === undefined) {
            createFollowMutate({ userId });
        } else {
            updateFollowMutate({ userId });
        }
        Haptic.trigger('impactLight');
    };

    return { mutateFollow };
}
