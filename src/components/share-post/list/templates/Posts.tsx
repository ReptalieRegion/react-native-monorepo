import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

import SharePostListSkeleton from '../atoms/SharePostListSkeleton';
import FloatingActionButtons from '../molecules/FloatingActionButtons';
import PostCard from '../organisms/PostCard';

import { useFetchPosts } from '@/apis/share-post';
import { color } from '@/components/common/tokens/colors';
import FlatListContextComponent from '@/contexts/flat-list/FlatList';

const Posts = () => {
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, isLoading, refetch } = useFetchPosts();

    if (isLoading) {
        return <SharePostListSkeleton />;
    }

    if (!data) {
        return null;
    }

    const onRefresh = () => {
        setRefreshing(true);
        /** @todo 일상공유 리스트 pull to refresh */
        refetch();
        setRefreshing(false);
    };

    return (
        <View style={styles.container}>
            <FlatListContextComponent
                contentContainerStyle={styles.listContainer}
                data={data}
                keyExtractor={(item) => item.postId}
                renderItem={({ item }) => <PostCard {...item} />}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                initialNumToRender={5}
                maxToRenderPerBatch={10}
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
