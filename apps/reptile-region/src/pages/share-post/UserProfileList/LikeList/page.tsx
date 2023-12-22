import React from 'react';

import { SHARE_POST_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useInfiniteFetchLikes from '@/apis/share-post/post/hooks/queries/useInfiniteFetchLikes';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';
import useProfileListActions from '@/pages/share-post/UserProfileList/@hooks/useProfileListActions';
import useUserProfileNavigation from '@/pages/share-post/UserProfileList/@hooks/useUserProfileNavigation';
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
    console.log(data);
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();
    const { navigateImageThumbnail } = useUserProfileNavigation(pageState);
    const { updateOrCreateFollow } = useProfileListActions({ queryKey: SHARE_POST_QUERY_KEYS.likeList(postId) });

    return (
        <UserProfileList
            data={data}
            onEndReached={handleFetchNextPage}
            onPressProfile={navigateImageThumbnail}
            onPressFollow={updateOrCreateFollow}
        />
    );
}
