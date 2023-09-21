import React from 'react';
import { StyleSheet, View } from 'react-native';

import TaggedContent from '../../common/atoms/TaggedContent';
import CommentContent from '../atoms/CommentContent';
import LikeContent from '../atoms/LikeContent';

type PostContentProps = {
    post: {
        likeCount: number;
        commentCount: number;
        contents: string;
        id: string;
    };
    handleTagPress: (tag: string) => void;
    handleCommentPress: () => void;
};

export default function PostContent({
    post: { id: postId, commentCount, contents, likeCount },
    handleTagPress,
    handleCommentPress,
}: PostContentProps) {
    return (
        <View style={styles.container}>
            <LikeContent likeCount={likeCount} />
            <TaggedContent uuid={postId} contents={contents} onPressTag={handleTagPress} />
            <CommentContent commentCount={commentCount} onPress={handleCommentPress} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 5,
    },
    content: {
        overflow: 'hidden',
    },
});
