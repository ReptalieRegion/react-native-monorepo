import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View } from 'react-native';

import PostCardContents from '../../components/PostCard/Contents';
import PostCardHeader from '../../components/PostCard/Header';

import { Interactive, PostCardImageCarousel } from './components';
import PostCard from './providers/PostCard';

import type { ImageType } from '@/types/global/image';

type PostCardState = {
    post: {
        id: string;
        contents: string;
        images: ImageType[];
        isMine: boolean;
        showFollowButton?: boolean;
        isLike: boolean | undefined;
        likeCount: number;
        createdAt: string;
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
    onPressLikeContents(): void;
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
        createdAt,
        showFollowButton = true,
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
    onPressLikeContents,
}: PostCardProps) {
    return (
        <View style={[styles.container, containerStyle]}>
            <PostCard uuid={postId}>
                <PostCardHeader
                    profileImage={profile}
                    isFollow={isFollow}
                    nickname={nickname}
                    showFollowButton={!isMine && showFollowButton}
                    onPressFollow={onPressFollow}
                    onPressPostOptionsMenu={onPressPostOptionsMenu}
                    onPressProfile={onPressProfile}
                />
                <PostCardImageCarousel images={images} onDoublePress={onDoublePressImageCarousel} />
                <Interactive
                    imageCount={images.length}
                    isLike={isLike}
                    onPressComment={onPressComment}
                    onPressHeart={onPressHeart}
                />
                <PostCardContents
                    post={{ id: postId, commentCount, contents, likeCount, createdAt }}
                    onPressComment={onPressComment}
                    onPressTag={onPressTag}
                    onPressLikeContents={onPressLikeContents}
                />
            </PostCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
});
