import React from 'react';
import { StyleSheet, View } from 'react-native';
import list from '@/mocks/data/list.json';
import { ScrollContextComponent } from '@/contexts/scroll/ScrollContext';
import { color } from '@/components/common/tokens/colors';
import PostCard from '../organisms/PostCard';
import FloatingActionButtons from '../molecules/FloatingActionButtons';

const Posts = () => {
    return (
        <View style={styles.container}>
            <ScrollContextComponent
                fixedChildren={{
                    renderItem: <FloatingActionButtons />,
                    position: { bottom: 20, right: 20 },
                }}
            >
                <View style={styles.ScrollContainer}>
                    {list.map((props) => (
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
