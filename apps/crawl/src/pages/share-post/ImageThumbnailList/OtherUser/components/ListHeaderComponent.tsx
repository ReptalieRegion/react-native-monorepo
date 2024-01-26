import { useRoute } from '@react-navigation/native';
import React from 'react';

import useFetchActivitySummary from '@/apis/share-post/user/hooks/queries/useFetchActivitySummary';
import UserProfile, { type UserDetailPanelActions } from '@/pages/share-post/ImageThumbnailList/@common/components/UserProfile';
import useUserProfile from '@/pages/share-post/ImageThumbnailList/OtherUser/hooks/queries/useUserProfile';
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
    const { data } = useUserProfile({ isFollow, nickname, profile });
    const { data: activitySummary } = useFetchActivitySummary({ nickname });

    return (
        <UserProfile
            style={containerStyle}
            user={{
                ...data!.user,
                followerCount: activitySummary.followerCount,
                followingCount: activitySummary.followingCount,
            }}
            postCount={activitySummary.postCount}
            navigateFollowPage={navigateFollowPage}
            handlePressFollow={handlePressFollow}
        />
    );
}
