import React from 'react';
import { StyleSheet, View } from 'react-native';

import SharePostListSkeleton from '../atoms/SharePostListSkeleton';
import FloatingActionButtons from '../molecules/FloatingActionButtons';
import PostCard from '../organisms/PostCard';

import { useFetchPosts } from '@/apis/share-post';
import { color } from '@/components/common/tokens/colors';
import { ScrollContextComponent } from '@/contexts/scroll/Scroll';

const Posts = () => {
    const { data, isLoading } = useFetchPosts();

    if (isLoading) {
        return <SharePostListSkeleton />;
    }

    if (!data) {
        return null;
    }

    return (
        <View style={styles.container}>
            <ScrollContextComponent
                fixedChildren={{
                    renderItem: <FloatingActionButtons />,
                    position: { bottom: 20, right: 20 },
                }}
            >
                <View style={styles.ScrollContainer}>
                    {data.map((props) => (
                        <PostCard key={props.postId} {...props} />
                    ))}
                </View>
            </ScrollContextComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    ScrollContainer: {
        padding: 20,
    },
});

export default Posts;
