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
    name,
    commentCount,
    likeCount,
    content,
    isLike,
}: SharePostsData) => {
    return (
        <View style={styles.container}>
            <PostHeader userId={userId} isFollow={isFollow} profile={profile} name={name} />
            <PostImageCarousel postId={postId} images={images} />
            <InteractivePost postId={postId} isLike={isLike} images={images} />
            <PostContent likeCount={likeCount} commentCount={commentCount} content={content} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});

export default PostCard;
