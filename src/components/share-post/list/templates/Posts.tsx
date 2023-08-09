import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import SharePostListSkeleton from '../atoms/SharePostListSkeleton';
import FloatingActionButtons from '../molecules/FloatingActionButtons';
import PostCard from '../organisms/PostCard';

import { useInfiniteFetchPosts } from '@/apis/share-post';
import { color } from '@/components/common/tokens/colors';
import FlatListContextComponent from '@/contexts/flat-list/FlatList';

const ListFooterLoading = (isFetchingNextPage: boolean) => {
    return isFetchingNextPage ? <ActivityIndicator size={'small'} /> : null;
};

const Posts = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, remove, refetch } = useInfiniteFetchPosts();
    const ListFooterComponent = ListFooterLoading(isFetchingNextPage);

    if (isLoading) {
        return <SharePostListSkeleton />;
    }

    if (!data) {
        return null;
    }

    const onRefresh = () => {
        setRefreshing(true);
        remove();
        refetch();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <FlatListContextComponent
                contentContainerStyle={styles.listContainer}
                data={data.pages.flatMap((page) => page.items)}
                keyExtractor={(item) => item.postId}
                renderItem={({ item }) => <PostCard {...item} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
                onEndReached={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
                ListFooterComponent={ListFooterComponent}
                fixedChildren={{
                    renderItem: <FloatingActionButtons />,
                    position: { bottom: 20, right: 20 },
                }}
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
    scrollContainer: {
        padding: 20,
    },
});

export default Posts;
