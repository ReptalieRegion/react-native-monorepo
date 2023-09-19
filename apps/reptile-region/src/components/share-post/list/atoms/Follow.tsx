import { TextColorType } from 'design-system';
import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React from 'react';
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

const Follow = ({ user: { isFollow, id: userId } }: PostHeaderProps) => {
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
        <TouchableTypo variant="title5" color={followInfo.color} onPress={handleClickFollow}>
            {followInfo.text}
        </TouchableTypo>
    );
};

export default Follow;
