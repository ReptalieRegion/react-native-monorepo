import React from 'react';
import { StyleSheet, View } from 'react-native';

import CommentIcon from '../atoms/CommentIcon';
import ImagesIndicators from '../atoms/ImagesIndicators';
import Like from '../atoms/Like';

import { SharePostListData } from '<SharePostListAPI>';

type InteractivePostProps = Pick<SharePostListData, 'isLike' | 'postId' | 'images'>;

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
