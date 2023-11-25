import React from 'react';

import type { FollowingPageScreenProps } from '../../type';

import useInfiniteFollowingList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowingList';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useUserProfileNavigation from '@/hooks/share-post/navigation/useUserProfileNavigation';

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

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} onPressProfile={handlePressProfile} />;
}
