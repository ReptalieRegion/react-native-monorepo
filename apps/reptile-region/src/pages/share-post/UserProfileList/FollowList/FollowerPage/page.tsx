import React from 'react';

import type { FollowerPageScreenProps } from './type';

import useInfiniteFollowerList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowerList';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useUserProfileNavigation from '@/hooks/share-post/navigation/useUserProfileNavigation';

export default function FollowerList({
    route: {
        params: {
            user: { id: userId },
        },
    },
}: FollowerPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFollowerList({ userId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();
    const { handlePressProfile } = useUserProfileNavigation();

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} onPressProfile={handlePressProfile} />;
}
