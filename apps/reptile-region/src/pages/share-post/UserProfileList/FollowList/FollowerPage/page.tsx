import type { MaterialTopTabScreenProps } from '@react-navigation/material-top-tabs';
import React from 'react';

import type { SharePostTopTabParamList } from '<routes/top-tab>';
import useInfiniteFollowerList from '@/apis/share-post/user/hooks/queries/useInfiniteFollowerList';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';

type FollowerPageScreenProps = MaterialTopTabScreenProps<SharePostTopTabParamList, 'share-post/follower/list'>;

export default function FollowerList({ route: { params } }: FollowerPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFollowerList({ userId: params.userId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} />;
}
