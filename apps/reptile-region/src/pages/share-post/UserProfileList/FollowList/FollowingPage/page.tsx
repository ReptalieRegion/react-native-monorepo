import React from 'react';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteFollowingList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowingList';
import UserProfileList from '@/pages/share-post/UserProfileList/@common/components/ProfileList';
import useProfileListActions from '@/pages/share-post/UserProfileList/@common/hooks/useProfileListActions';
import useUserProfileNavigation from '@/pages/share-post/UserProfileList/@common/hooks/useUserProfileNavigation';
import type { FollowingPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function FollowingList({
    route: {
        params: {
            user: { id: userId },
            pageState,
        },
    },
}: FollowingPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFollowingList({ userId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();
    const { navigateImageThumbnail } = useUserProfileNavigation(pageState);
    const { updateOrCreateFollow } = useProfileListActions({ queryKey: SHARE_POST_QUERY_KEYS.followingList(userId) });

    return (
        <UserProfileList
            data={data}
            onEndReached={handleFetchNextPage}
            onPressProfile={navigateImageThumbnail}
            onPressFollow={updateOrCreateFollow}
        />
    );
}
