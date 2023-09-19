import { TextColorType, Typo } from 'design-system';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import * as Haptic from 'react-native-haptic-feedback';

import type { SharePostListData } from '<SharePostAPI>';
import useCreateFollow from '@/apis/share-post/user/hooks/mutations/useCreateFollow';
import useUpdateFollow from '@/apis/share-post/user/hooks/mutations/useUpdateFollow';

type PostHeaderProps = {
    user: Pick<SharePostListData['user'], 'isFollow' | 'id'>;
};

interface FollowInfo {
    color: TextColorType;
    text: string;
}

const following: FollowInfo = { color: 'placeholder', text: '✓ 팔로잉' };
const follow: FollowInfo = { color: 'primary', text: '팔로우' };

const makeFollowInfo = (isFollow: boolean | undefined) => {
    return isFollow ? following : follow;
};

const Follow = ({ user: { id: userId, isFollow } }: PostHeaderProps) => {
    const { mutate: createMutate } = useCreateFollow();
    const { mutate: updateMutate } = useUpdateFollow();

    const handleClickFollow = () => {
        if (isFollow === undefined) {
            createMutate({ userId });
        } else {
            updateMutate({ userId });
        }
        Haptic.trigger('impactLight');
    };

    const followInfo = makeFollowInfo(isFollow);

    return (
        <TouchableWithoutFeedback onPress={handleClickFollow}>
            <Typo variant="title5" color={followInfo.color}>
                {followInfo.text}
            </Typo>
        </TouchableWithoutFeedback>
    );
};

export default Follow;
