import React from 'react';
import { StyleSheet, View } from 'react-native';

import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostHeader from '../molecules/PostHeader';
import PostImageCarousel from '../molecules/PostImageCarousel';

import { FetchPostResponse } from '<api/share/post>';
import type { SharePostListNavigationProps } from '<SharePostComponent>';

type PostCardProps = SharePostListNavigationProps & FetchPostResponse;

export default function PostCard({
    post: {
        id: postId,
        images,
        isLike,
        commentCount,
        contents,
        likeCount,
        isMine,
        user: { id: userId, isFollow, nickname, profile },
    },
    navigateBottomSheetKebabMenu,
    navigateCommentPage,
    navigateDetailPage,
}: PostCardProps) {
    /** navigation 시작 */
    const handleTagPress = (tag: string) => {
        navigateDetailPage({ nickname: tag, isFollow, profile });
    };

    const handleProfilePress = () => {
        navigateDetailPage({ nickname, isFollow, profile });
    };

    const handleKebabMenuPress = () => {
        navigateBottomSheetKebabMenu({ post: { id: postId, isMine }, user: { id: userId } });
    };

    const handleCommentPress = () => {
        navigateCommentPage({ post: { id: postId } });
    };
    /** navigation 끝 */

    return (
        <View style={styles.container}>
            <PostHeader
                post={{ isMine }}
                user={{ id: userId, isFollow, nickname, profile }}
                handleProfilePress={handleProfilePress}
                handleKebabMenuPress={handleKebabMenuPress}
            />
            <PostImageCarousel post={{ id: postId, images, isLike }} />
            <InteractivePost post={{ id: postId, images, isLike }} handleCommentPress={handleCommentPress} />
            <PostContent
                post={{ id: postId, commentCount, contents, likeCount }}
                handleTagPress={handleTagPress}
                handleCommentPress={handleCommentPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});
