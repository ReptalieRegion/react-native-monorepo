import React from 'react';
import PostHeader from '../molecules/PostHeader';
import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostImageCarousel from '../molecules/PostImageCarousel';
import { SharePostsData } from '<SharePostAPI>';
import { StyleSheet, View } from 'react-native';

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
}: SharePostsData) => {
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

export default PostCard;
