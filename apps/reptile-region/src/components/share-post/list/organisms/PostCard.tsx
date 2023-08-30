import React from 'react';
import { StyleSheet, View } from 'react-native';

import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostHeader from '../molecules/PostHeader';
import PostImageCarousel from '../molecules/PostImageCarousel';

import type { SharePostListData } from '<SharePostAPI>';

const PostCard = ({ post, user }: SharePostListData) => {
    const { id: postId, images, isLike, commentCount, contents, likeCount, tagIds } = post;
    const { id: userId, isFollow, nickname, profile } = user;

    return (
        <View style={styles.container}>
            <PostHeader post={{ id: postId, isMine: post.isMine }} user={{ id: userId, isFollow, nickname, profile }} />
            <PostImageCarousel post={{ id: postId, images }} />
            <InteractivePost post={{ id: postId, images, isLike }} />
            <PostContent post={{ id: postId, commentCount, contents, likeCount, tagIds }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});

export default PostCard;
