import React from 'react';
import { StyleSheet, View } from 'react-native';

import CommentIcon from '../atoms/CommentIcon';
import ImagesIndicators from '../atoms/ImagesIndicators';
import Like from '../atoms/Like';

import type { SharePostListData } from '<SharePostAPI>';

type InteractivePostProps = {
    post: Pick<SharePostListData['post'], 'id' | 'isLike' | 'images'>;
};

const InteractivePost = ({ post }: InteractivePostProps) => {
    const { id: postId, images, isLike } = post;

    return (
        <View style={[styles.container, styles.flexRow]}>
            <View style={[styles.flexRow, styles.likeCommentContent]}>
                <Like post={{ id: postId, isLike }} />
                <CommentIcon post={{ id: postId }} />
            </View>
            <ImagesIndicators post={{ id: postId, images }} />
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
