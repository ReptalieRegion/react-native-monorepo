import React from 'react';

import useInfiniteFetchLikes from '@/apis/share-post/post/hooks/queries/useInfiniteFetchLikes';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useProfileListActions from '@/hooks/share-post/actions/useProfileListActions';
import useUserProfileNavigation from '@/hooks/share-post/navigation/useUserProfileNavigation';
import type { LikeListPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function LikeList({
    route: {
        params: {
            post: { id: postId },
            pageState,
        },
    },
}: LikeListPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchLikes({ postId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();
    const { handlePressProfile } = useUserProfileNavigation(pageState);
    const { handlePressFollow } = useProfileListActions({ type: 'LIKE', postId });

    return (
        <UserProfileList
            data={data}
            onEndReached={handleFetchNextPage}
            onPressProfile={handlePressProfile}
            onPressFollow={handlePressFollow}
        />
    );
}
