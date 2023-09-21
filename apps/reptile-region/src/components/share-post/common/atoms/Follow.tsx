import { TextColorType } from 'design-system';
import { TouchableTypo } from 'design-system';
import React from 'react';
import * as Haptic from 'react-native-haptic-feedback';

import useCreateFollow from '@/apis/share-post/user/hooks/mutations/useCreateFollow';
import useUpdateFollow from '@/apis/share-post/user/hooks/mutations/useUpdateFollow';

type PostHeaderProps = {
    user: {
        id: string;
        isFollow: boolean | undefined;
    };
};

type FollowType = 'follow' | 'following';

type FollowInfo = {
    [key in FollowType]: {
        color: TextColorType;
        text: string;
    };
};

const FOLLOW_INFO: FollowInfo = {
    follow: {
        color: 'primary',
        text: '팔로우',
    },
    following: {
        color: 'placeholder',
        text: '✓ 팔로잉',
    },
};

const makeFollowInfo = (isFollow: boolean | undefined) => {
    const type: FollowType = isFollow ? 'follow' : 'following';
    return FOLLOW_INFO[type];
};

export default function Follow({ user: { isFollow, id: userId } }: PostHeaderProps) {
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
}
