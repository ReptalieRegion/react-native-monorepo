import { ListRenderItemInfo } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostImageCarousel from '../molecules/PostImageCarousel';
import PostModalHeader from '../molecules/PostModalHeader';

import type { SharePostListUserDetailData } from '<SharePostAPI>';
import { SharePostUserData } from '<SharePostUserAPI>';

const PostModalCard = ({ item: { post }, extraData }: ListRenderItemInfo<SharePostListUserDetailData>) => {
    const { id: postId, images, isLike, commentCount, contents, likeCount } = post;
    const { id: userId, nickname, profile } = extraData as SharePostUserData['user'];

    return (
        <View style={styles.container}>
            <PostModalHeader post={{ id: postId, isMine: post.isMine }} user={{ id: userId, nickname, profile }} />
            <PostImageCarousel post={{ id: postId, images, isLike }} />
            <InteractivePost post={{ id: postId, images, isLike }} />
            <PostContent post={{ id: postId, commentCount, contents, likeCount }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});

export default PostModalCard;
