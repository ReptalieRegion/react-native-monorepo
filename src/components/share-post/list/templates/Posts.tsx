import React from 'react';
import { StyleSheet, View } from 'react-native';
import list from '@/mocks/data/share-post/list.json';
import { ScrollContextComponent } from '@/contexts/scroll/ScrollContext';
import { color } from '@/components/common/tokens/colors';
import PostCard from '../organisms/PostCard';
import FloatingActionButtons from '../molecules/FloatingActionButtons';
import { useFetchPosts } from '@/apis/share-post';
import SharePostListSkeleton from '../atoms/SharePostListSkeleton';

const Posts = () => {
    const { data, isLoading } = useFetchPosts();
    const temp = data ? data : list;

    if (isLoading) {
        return <SharePostListSkeleton />;
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
                    {temp.map((props) => (
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
        backgroundColor: color.White[50].toString(),
    },
    ScrollContainer: {
        padding: 20,
    },
});

export default Posts;
