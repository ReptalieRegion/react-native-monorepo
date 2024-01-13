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

export default function Follow({ isFollow, onPress }: FollowProps) {
    const followInfo = generatedInfo(isFollow);

    return (
        <TouchableTypo variant="title4" color={followInfo.color} onPress={onPress}>
            {followInfo.text}
        </TouchableTypo>
    );
}

function generatedInfo(isFollow: boolean | undefined): {
    color: TextColorType;
    text: string;
} {
    if (isFollow) {
        return {
            color: 'placeholder',
            text: '✓ 팔로잉',
        };
    }

    return {
        color: 'primary',
        text: '팔로우',
    };
}
