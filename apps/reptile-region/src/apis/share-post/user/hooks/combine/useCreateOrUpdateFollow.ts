import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from '../mutations/useCreateFollow';
import useUpdateFollow from '../mutations/useUpdateFollow';

import type { CreateFollowRequest, UpdateFollowRequest } from '@/types/apis/share-post/user';

interface UseCreateOrUpdateFollowActions {
    onMutate(variables: CreateFollowRequest | UpdateFollowRequest): unknown;
}

type UseCreateOrUpdateFollowProps = UseCreateOrUpdateFollowActions;

export default function useCreateOrUpdateFollow(props?: UseCreateOrUpdateFollowProps) {
    const { mutate: createFollowMutate } = useCreateFollow({ onMutate: props?.onMutate });
    const { mutate: updateFollowMutate } = useUpdateFollow({ onMutate: props?.onMutate });

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
