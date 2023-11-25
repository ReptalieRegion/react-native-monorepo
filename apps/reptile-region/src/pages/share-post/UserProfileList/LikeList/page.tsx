import React from 'react';

import type { LikeListPageScreenProps } from '../type';

import useInfiniteFetchLikes from '@/apis/share-post/post/hooks/queries/useInfiniteFetchLikes';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useUserProfileNavigation from '@/hooks/share-post/navigation/useUserProfileNavigation';

export default function LikeList({
    route: {
        params: {
            post: { id: postId },
        },
    },
}: LikeListPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchLikes({ postId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();
    const { handlePressProfile } = useUserProfileNavigation();

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} onPressProfile={handlePressProfile} />;
}
