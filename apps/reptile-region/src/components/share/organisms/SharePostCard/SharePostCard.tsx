import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import PostCard from './providers/PostCard';

import { ImageType } from '<image>';

type PostCardState = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
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
    containerStyle?: ViewStyle;
};

interface PostCardActions {
    onDoublePressImageCarousel(): void;
    onPressFollow(): void;
    onPressPostOptionsMenu(): void;
    onPressProfile(): void;
    onPressComment(): void;
    onPressHeart(): void;
    onPressTag(tag: string): void;
}

type PostCardProps = PostCardState & PostCardActions;

export default function SharePostCard({
    post: {
        id: postId,
        images,
        isLike,
        commentCount,
        contents,
        likeCount,
        isMine,
        user: { isFollow, nickname, profile },
    },
    containerStyle,
    onDoublePressImageCarousel,
    onPressFollow,
    onPressPostOptionsMenu,
    onPressProfile,
    onPressComment,
    onPressHeart,
    onPressTag,
}: PostCardProps) {
    return (
        <PostCard uuid={postId}>
            <View style={[styles.container, containerStyle]}>
                <PostCard.Header
                    profileImage={profile}
                    isFollow={isFollow}
                    nickname={nickname}
                    showFollowButton={!isMine}
                    onPressFollow={onPressFollow}
                    onPressPostOptionsMenu={onPressPostOptionsMenu}
                    onPressProfile={onPressProfile}
                />
                <PostCard.ImageCarousel images={images} onDoublePress={onDoublePressImageCarousel} />
                <PostCard.Interactive
                    imageCount={images.length}
                    isLike={isLike}
                    onPressComment={onPressComment}
                    onPressHeart={onPressHeart}
                />
                <PostCard.Contents
                    post={{ id: postId, commentCount, contents, likeCount }}
                    onPressComment={onPressComment}
                    onPressTag={onPressTag}
                />
            </View>
        </PostCard>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
    },
});
