import React from 'react';
import Like from '../atoms/Like';
import CommentIcon from '../atoms/CommentIcon';
import ImagesIndicators from '../atoms/ImagesIndicators';
import { SharePostsData } from '<SharePostAPI>';
import { StyleSheet, View } from 'react-native';

type InteractivePostProps = Pick<SharePostsData, 'isLike' | 'postId' | 'images'>;

const InteractivePost = ({ postId, isLike, images }: InteractivePostProps) => {
    return (
        <View style={[styles.container, styles.flexRow]}>
            <View style={[styles.flexRow, styles.likeCommentContent]}>
                <Like postId={postId} isLike={isLike} />
                <CommentIcon postId={postId} />
            </View>
            <ImagesIndicators images={images} postId={postId} />
            <View style={styles.empty} />
        </View>
    );
};

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

export default InteractivePost;
