import { useRoute } from '@react-navigation/native';
import React from 'react';

import useUserProfileAndPostCount from '@/apis/share-post/post/hooks/combine/useUserProfileAndPostCount';
import UserProfile, { type UserDetailPanelActions } from '@/components/share-post/molecules/UserProfile/UserProfile';
import type { SharePostImageThumbnailListModalRouteProp } from '@/types/routes/props/share-post/image-thumbnail';

type ListHeaderComponentState = {
    containerStyle?: {
        height?: number;
        padding?: number;
    };
};

type ListHeaderComponentProps = ListHeaderComponentState & UserDetailPanelActions;

export default function ListHeaderComponent({
    containerStyle,
    handlePressFollow,
    navigateFollowPage,
}: ListHeaderComponentProps) {
    const {
        params: {
            user: { isFollow, nickname, profile },
        },
    } = useRoute<SharePostImageThumbnailListModalRouteProp>();
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
