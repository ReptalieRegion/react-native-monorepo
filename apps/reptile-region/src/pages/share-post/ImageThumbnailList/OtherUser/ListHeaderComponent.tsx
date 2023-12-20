import React from 'react';

import useUserProfileAndPostCount from '@/apis/share-post/post/hooks/combine/useUserProfileAndPostCount';
import UserProfile, { type UserDetailPanelActions } from '@/components/share-post/molecules/UserProfile/UserProfile';
import type { ImageType } from '@/types/global/image';

type ListHeaderComponentState = {
    isFollow: boolean | undefined;
    nickname: string;
    profile: ImageType;
    containerStyle?: {
        height?: number;
        padding?: number;
    };
};

type ListHeaderComponentProps = ListHeaderComponentState & UserDetailPanelActions;

export default function ListHeaderComponent({
    isFollow,
    nickname,
    profile,
    containerStyle,
    handlePressFollow,
    navigateFollowPage,
}: ListHeaderComponentProps) {
    const { data } = useUserProfileAndPostCount({ isFollow, nickname, profile });

    return (
        <UserProfile
            style={containerStyle}
            user={data.user}
            postCount={data.postCount}
            navigateFollowPage={navigateFollowPage}
            handlePressFollow={handlePressFollow}
        />
    );
}
