import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useMemo, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import FloatingActionButtons from '../molecules/FloatingActionButtons';
import PostCard from '../organisms/PostCard';

import type { FetchPostResponse } from '<api/share/post>';
import type { SharePostListNavigationProps } from '<SharePostComponent>';
import useInfiniteFetchPosts from '@/apis/share-post/post/hooks/queries/useInfiniteFetchPosts';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';
import useFlashListScroll from '@/hooks/flash-list/useFlashListScroll';

export default function Posts(props: SharePostListNavigationProps) {
    /** FlashList 시작 */
    const { flashListRef, scrollDirection, scrollToTop, determineScrollDirection } = useFlashListScroll<FetchPostResponse>();
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchPosts();

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data]);
    console.log(newData);
    const keyExtractor = useCallback((item: FetchPostResponse) => item.post.id, []);
    const renderItem = useCallback(
        ({ item }: ListRenderItemInfo<FetchPostResponse>) => <PostCard {...item} {...props} />,
        [props],
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
    /** FlashList 끝 */

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                contentContainerStyle={styles.listContainer}
                data={newData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                estimatedItemSize={400}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                onEndReached={onEndReached}
                ListFooterComponent={ListFooterComponent}
                scrollEventThrottle={16}
                onScroll={determineScrollDirection}
            />
            <FloatingActionButtons animationMode={scrollDirection} scrollToTop={scrollToTop} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    listContainer: {
        padding: 20,
    },
});
