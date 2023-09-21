import React from 'react';
import { StyleSheet, View } from 'react-native';

import CommentIcon from '../atoms/CommentIcon';
import ImagesIndicators from '../atoms/ImagesIndicators';
import Like from '../atoms/LikeIcon';

import { ShareImageType } from '<Image>';

type InteractivePostProps = {
    post: {
        id: string;
        isLike: boolean | undefined;
        images: ShareImageType[];
    };
    handleCommentPress: () => void;
};

export default function InteractivePost({ post: { id: postId, images, isLike }, handleCommentPress }: InteractivePostProps) {
    return (
        <View style={[styles.container, styles.flexRow]}>
            <View style={[styles.flexRow, styles.likeCommentContent]}>
                <Like post={{ id: postId, isLike }} />
                <CommentIcon onPress={handleCommentPress} />
            </View>
            <ImagesIndicators imageCount={images.length} post={{ id: postId }} />
            <View style={styles.empty} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
    },
    flexRow: {
        flexDirection: 'row',
    },
    likeCommentContent: {
        marginLeft: -5,
    },
    empty: {
        width: 80,
    },
});
