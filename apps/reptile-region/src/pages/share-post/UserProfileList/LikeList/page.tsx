import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import useInfiniteFetchLikes from '@/apis/share-post/post/hooks/queries/useInfiniteFetchLikes';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';

type FollowerPageScreenProps = MaterialTopTabScreenProps<SharePostTabParamList, 'share-post/list/like'>;

export default function LikeListPage({ route: { params } }: FollowerPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchLikes({ postId: params.postId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} />;
}
