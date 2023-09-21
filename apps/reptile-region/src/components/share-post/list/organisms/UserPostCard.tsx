import React from 'react';
import { StyleSheet, View } from 'react-native';

import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostImageCarousel from '../molecules/PostImageCarousel';
import PostModalHeader from '../molecules/PostModalHeader';

import type { ShareImageType } from '<Image>';
import type { SharePostListNavigationProps } from '<SharePostComponent>';

type PostModalCardProps = {
    post: {
        id: string;
        images: ShareImageType[];
        contents: string;
        isMine: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        commentCount: number;
    };
    user: {
        id: string;
        nickname: string;
        profile: ShareImageType;
    };
} & SharePostListNavigationProps;

export default function UserPostCard({
    post: { id: postId, images, isLike, commentCount, contents, likeCount, isMine },
    user: { id: userId, nickname, profile },
    navigateBottomSheetKebabMenu,
    navigateCommentPage,
    navigateDetailPage,
}: PostModalCardProps) {
    /** navigation 시작 */
    const handleTagPress = (tag: string) => {
        navigateDetailPage({ nickname: tag });
    };

    const handleProfilePress = () => {
        navigateDetailPage({ nickname });
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
            <PostModalHeader
                user={{ nickname, profile }}
                handleProfilePress={handleProfilePress}
                handleKebabMenuPress={handleKebabMenuPress}
            />
            <PostImageCarousel post={{ id: postId, images, isLike }} />
            <InteractivePost post={{ id: postId, images, isLike }} handleCommentPress={handleCommentPress} />
            <PostContent
                post={{ id: postId, commentCount, contents, likeCount }}
                handleCommentPress={handleCommentPress}
                handleTagPress={handleTagPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});
