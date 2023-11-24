import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';

import type { SharePostTopTabParamList } from '<routes/top-tab>';
import useInfiniteFollowingList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowingList';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';

type FollowingPageScreenProps = MaterialTopTabScreenProps<SharePostTopTabParamList, 'share-post/following/list'>;

export default function FollowingList({ route: { params } }: FollowingPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFollowingList({ userId: params.userId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} />;
}
