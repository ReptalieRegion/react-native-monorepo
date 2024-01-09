import React from 'react';

import useFetchMeProfile from '@/apis/me/profile/hooks/queries/useFetchMeProfile';
import useFetchActivitySummary from '@/apis/share-post/user/hooks/queries/useFetchActivitySummary';
import UserProfile from '@/pages/share-post/ImageThumbnailList/@common/components/UserProfile';
import type { FollowRouterParams } from '@/types/routes/params/sharePost';

interface ListHeaderComponentActions {
    navigateFollowerPage(params: FollowRouterParams): void;
}

type ListHeaderComponentProps = ListHeaderComponentActions;

export default function ListHeaderComponent({ navigateFollowerPage }: ListHeaderComponentProps) {
    const { data } = useFetchMeProfile();
    const { data: activitySummary } = useFetchActivitySummary({ nickname: data.user.nickname, enabled: !!data?.user.nickname });

    return (
        <UserProfile
            navigateFollowPage={navigateFollowerPage}
            user={{
                ...data?.user,
                followerCount: activitySummary.followerCount,
                followingCount: activitySummary.followingCount,
            }}
            postCount={activitySummary.postCount}
        />
    );
}
