import type { TextColorType } from '@crawl/design-system';
import { TouchableTypo } from '@crawl/design-system';
import React from 'react';

type FollowState = {
    isFollow: boolean | undefined;
};

interface FollowActions {
    onPress(): void;
}

type FollowProps = FollowState & FollowActions;

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
    const type: FollowType = isFollow ? 'following' : 'follow';
    return FOLLOW_INFO[type];
};

export default function Follow({ isFollow, onPress }: FollowProps) {
    const followInfo = makeFollowInfo(isFollow);

    return (
        <TouchableTypo variant="title4" color={followInfo.color} onPress={onPress}>
            {followInfo.text}
        </TouchableTypo>
    );
}
