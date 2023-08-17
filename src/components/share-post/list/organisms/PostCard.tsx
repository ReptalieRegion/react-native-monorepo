import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostHeader from '../molecules/PostHeader';
import PostImageCarousel from '../molecules/PostImageCarousel';

import { SharePostListData } from '<SharePostListAPI>';

const PostCard = ({
    userId,
    isFollow,
    postId,
    profile,
    images,
    nickname,
    commentCount,
    likeCount,
    content,
    isLike,
}: SharePostListData) => {
    return (
        <View style={styles.container}>
            <PostHeader postId={postId} userId={userId} isFollow={isFollow} profile={profile} nickname={nickname} />
            <PostImageCarousel postId={postId} images={images} />
            <InteractivePost postId={postId} isLike={isLike} images={images} />
            <PostContent likeCount={likeCount} commentCount={commentCount} content={content} postId={postId} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});

export default memo(PostCard, (prevProps, nextProps) => prevProps.postId === nextProps.postId);
