import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';

import type { SharePostTabParamList } from '<routes/bottom-tab>';
import type { SharePostModalParamList } from '<routes/root>';
import useInfiniteFetchLikes from '@/apis/share-post/post/hooks/queries/useInfiniteFetchLikes';
import UserProfileList from '@/components/share-post/molecules/UserProfileList';

type LikeListPageScreenProps =
    | NativeStackScreenProps<SharePostTabParamList, 'share-post/list/like'>
    | NativeStackScreenProps<SharePostModalParamList, 'list/like'>;

export default function LikeList({ route: { params } }: LikeListPageScreenProps) {
    const { data, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteFetchLikes({ postId: params.postId });
    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    return <UserProfileList data={data} onEndReached={handleFetchNextPage} />;
}
