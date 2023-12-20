import { useCallback } from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from './mutations/useCreateFollow';
import useUpdateFollow from './mutations/useUpdateFollow';

import useAuthNavigation from '@/hooks/useNavigationAuth';

export default function useUpdateOrCreateFollow(nickname: string) {
    const { mutate: createFollowMutate } = useCreateFollow(nickname);
    const { mutate: updateFollowMutate } = useUpdateFollow(nickname);
    const { requireAuthNavigation } = useAuthNavigation();

    const updateOrCreateFollow = useCallback(
        ({ userId, isFollow }: { userId: string; isFollow: boolean | undefined }) =>
            requireAuthNavigation(() => {
                Haptic.trigger('impactLight');
                if (isFollow === undefined) {
                    createFollowMutate({ userId });
                } else {
                    updateFollowMutate({ userId });
                }
            }),
        [createFollowMutate, requireAuthNavigation, updateFollowMutate],
    );

    return updateOrCreateFollow;
}
