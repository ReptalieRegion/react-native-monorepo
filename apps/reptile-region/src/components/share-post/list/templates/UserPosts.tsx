import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import PostModalCard from '../organisms/PostModalCard';

import type { SharePostListUserDetailData } from '<SharePostAPI>';
import { SharePostRouteProp } from '<SharePostRoutes>';
import useInfiniteUserPosts from '@/apis/share-post/post/hooks/queries/useInfiniteUserPosts';
import useFetchUserProfile from '@/apis/share-post/user/hooks/queries/useFetchUserProfile';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const UserPosts = () => {
    const { params } = useRoute<SharePostRouteProp<'share-post/list/user'>>();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data: userData } = useFetchUserProfile({ nickname: params.nickname });
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteUserPosts({
        nickname: params.nickname,
    });

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data]);
    const keyExtractor = useCallback((item: SharePostListUserDetailData) => item.post.id, []);

    const renderItem = useCallback(
        (props: ListRenderItemInfo<SharePostListUserDetailData>) => <PostModalCard {...props} />,
        [],
    );
    const ListFooterComponent = useCallback(() => <ListFooterLoading isLoading={isFetchingNextPage} />, [isFetchingNextPage]);
    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);
    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={styles.listContainer}
                data={newData}
                extraData={userData?.user}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                estimatedItemSize={400}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={onEndReached}
                ListFooterComponent={ListFooterComponent}
                scrollEventThrottle={16}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    listContainer: {
        padding: 20,
    },
});

export default UserPosts;
