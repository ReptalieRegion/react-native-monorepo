import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import InteractivePost from '../molecules/InteractivePost';
import PostContent from '../molecules/PostContent';
import PostImageCarousel from '../molecules/PostImageCarousel';
import PostModalHeader from '../molecules/PostModalHeader';

import type { ImageType } from '<image>';
import type { SharePostListNavigationProps } from '<SharePostComponent>';

type PostModalCardProps = {
    post: {
        id: string;
        images: ImageType[];
        contents: string;
        isMine: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        commentCount: number;
        user: {
            id: string;
            nickname: string;
            profile: ImageType;
            isFollow: boolean | undefined;
        };
    };
} & SharePostListNavigationProps;

export default function UserPostCard({
    post: {
        id: postId,
        images,
        isLike,
        commentCount,
        contents,
        likeCount,
        isMine,
        user: { id: userId, nickname, profile, isFollow },
    },
    navigateBottomSheetKebabMenu,
    navigateCommentPage,
    navigateDetailPage,
}: PostModalCardProps) {
    /** navigation 시작 */
    const handleTagPress = (tag: string) => {
        navigateDetailPage({ nickname: tag, isFollow, profile });
    };

    const handleProfilePress = () => {
        navigateDetailPage({ nickname, isFollow, profile });
    };

    const handleKebabMenuPress = () => {
        navigateBottomSheetKebabMenu({ post: { id: postId, isMine: isMine, contents, images }, user: { id: userId } });
    };

    const handleCommentPress = () => {
        navigateCommentPage({ post: { id: postId } });
    };
    /** navigation 끝 */

    return (
        <Animated.View style={[styles.itemContainer]}>
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
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    itemContainer: {
        marginTop: 20,
        marginBottom: 20,
        minHeight: 444,
        maxHeight: 444,
    },
});
