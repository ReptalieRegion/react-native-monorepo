import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from './mutations/useCreateFollow';
import useUpdateFollow from './mutations/useUpdateFollow';

import useAuthNavigation from '@/hooks/useNavigationAuth';
import type { CustomQueryKey } from '@/types/apis/react-query';

export default function useProfileListActions(props: { queryKey: CustomQueryKey }) {
    const { mutate: createFollowMutate } = useCreateFollow(props);
    const { mutate: updateFollowMutate } = useUpdateFollow(props);
    const { requireAuthNavigation } = useAuthNavigation();

    const updateOrCreateFollow = ({ userId, isFollow }: { userId: string; isFollow: boolean | undefined }) =>
        requireAuthNavigation(() => {
            if (isFollow === undefined) {
                createFollowMutate({ userId });
            } else {
                updateFollowMutate({ userId });
            }
            Haptic.trigger('impactLight');
        });

    return {
        updateOrCreateFollow,
    };
}
