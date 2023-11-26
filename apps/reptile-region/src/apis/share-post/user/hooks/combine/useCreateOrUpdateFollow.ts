import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow, { type UseCreateFollowProps } from '../mutations/useCreateFollow';
import useUpdateFollow, { type UseUpdateFollowProps } from '../mutations/useUpdateFollow';

interface UseCreateOrUpdateFollowActions {
    create?: UseCreateFollowProps;
    update?: UseUpdateFollowProps;
}

type UseCreateOrUpdateFollowProps = UseCreateOrUpdateFollowActions;

export default function useCreateOrUpdateFollow(props?: UseCreateOrUpdateFollowProps) {
    const { mutate: createFollowMutate } = useCreateFollow(props?.create);
    const { mutate: updateFollowMutate } = useUpdateFollow(props?.update);

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
