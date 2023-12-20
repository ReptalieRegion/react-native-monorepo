import React from 'react';

import useInfiniteFollowingList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowingList';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useProfileListActions from '@/hooks/share-post/actions/useProfileListActions';
import useUserProfileNavigation from '@/hooks/share-post/navigation/useUserProfileNavigation';
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
    const { handlePressProfile } = useUserProfileNavigation(pageState);
    const { handlePressFollow } = useProfileListActions({ type: 'FOLLOWING_LIST', userId });

    return (
        <UserProfileList
            data={data}
            onEndReached={handleFetchNextPage}
            onPressProfile={handlePressProfile}
            onPressFollow={handlePressFollow}
        />
    );
}
