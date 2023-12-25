import React from 'react';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteFollowerList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowerList';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useProfileListActions from '@/pages/share-post/UserProfileList/@hooks/useProfileListActions';
import useUserProfileNavigation from '@/pages/share-post/UserProfileList/@hooks/useUserProfileNavigation';
import type { FollowerPageScreenProps } from '@/types/routes/props/share-post/user-profile';

export default function FollowerList({
    route: {
        params: {
            user: { id: userId },
            pageState,
        },
    },
}: FollowerPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFollowerList({ userId });
    console.log(data);
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();
    const { navigateImageThumbnail } = useUserProfileNavigation(pageState);
    const { updateOrCreateFollow } = useProfileListActions({ queryKey: SHARE_POST_QUERY_KEYS.followerList(userId) });

    return (
        <UserProfileList
            data={data}
            onEndReached={handleFetchNextPage}
            onPressProfile={navigateImageThumbnail}
            onPressFollow={updateOrCreateFollow}
        />
    );
}
