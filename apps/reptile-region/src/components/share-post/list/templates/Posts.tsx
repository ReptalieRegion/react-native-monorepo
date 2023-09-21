import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, RefreshControl, StyleSheet, View } from 'react-native';

import { ScrollToTopButtonAnimationMode } from '../atoms/ScrollToTopButton';
import FloatingActionButtons from '../molecules/FloatingActionButtons';
import PostCard from '../organisms/PostCard';

import type { ScrollIntoViewProps } from '<FlashList>';
import type { SharePostListData } from '<SharePostAPI>';
import useInfiniteFetchPosts from '@/apis/share-post/post/hooks/queries/useInfiniteFetchPosts';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const Posts = () => {
    const flashListRef = useRef<FlashList<SharePostListData>>(null);
    const lastScrollY = useRef(0);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [scrollDirection, setScrollDirection] = useState<ScrollToTopButtonAnimationMode>('STOP');
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteFetchPosts();

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data]);
    const keyExtractor = useCallback((item: SharePostListData) => item.post.id, []);
    const renderItem = useCallback(({ item }: ListRenderItemInfo<SharePostListData>) => <PostCard {...item} />, []);
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

    const scrollIntoView = ({ animated = false, offset }: ScrollIntoViewProps) => {
        flashListRef.current?.scrollToOffset({ animated, offset });
    };

    const determineScrollDirection = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        if (currentScrollY <= 0 || currentScrollY > lastScrollY.current) {
            setScrollDirection('DOWN');
        } else if (currentScrollY < lastScrollY.current) {
            setScrollDirection('UP');
        }

        lastScrollY.current = currentScrollY;
    };

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
            <FloatingActionButtons animationMode={scrollDirection} scrollIntoView={scrollIntoView} />
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

export default Posts;
