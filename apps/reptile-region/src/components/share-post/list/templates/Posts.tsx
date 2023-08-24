import { FlashList, ListRenderItemInfo } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import ListFooterLoading from '../../common/atoms/ListFooterComponent';
import { ScrollToTopButtonAnimationMode } from '../atoms/ScrollToTopButton';
import SharePostListSkeleton from '../atoms/SharePostListSkeleton';
import FloatingActionButtons from '../molecules/FloatingActionButtons';
import PostCard from '../organisms/PostCard';

import { ScrollIntoViewProps } from '<FlashList>';
import { SharePostListData } from '<SharePostListAPI>';
import { useInfiniteFetchPosts } from '@/apis/share-post';
import { color } from '@/components/common/tokens/colors';

const Posts = () => {
    const flashListRef = useRef<FlashList<SharePostListData>>(null);
    const lastScrollY = useRef(0);
    const [scrollDirection, setScrollDirection] = useState<ScrollToTopButtonAnimationMode>('STOP');
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, remove, refetch } = useInfiniteFetchPosts();

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data]);
    const keyExtractor = useCallback((item: SharePostListData) => item.post.id, []);
    const renderItem = useCallback(({ item }: ListRenderItemInfo<SharePostListData>) => <PostCard {...item} />, []);
    const ListFooterComponent = useCallback(() => <ListFooterLoading isLoading={isFetchingNextPage} />, [isFetchingNextPage]);
    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        remove();
        await refetch();
        setRefreshing(false);
    }, [refetch, remove]);
    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    if (isLoading || !data) {
        return <SharePostListSkeleton />;
    }

    const scrollIntoView = ({ animated = true, offset }: ScrollIntoViewProps) => {
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
                estimatedItemSize={200}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
