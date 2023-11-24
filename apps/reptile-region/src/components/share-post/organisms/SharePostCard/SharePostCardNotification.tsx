import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import NotificationPostContents from '../../molecules/NotificationPostContents';
import PostHeader from '../../molecules/PostHeader';

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

export default function SharePostCardNotification({
    post: {
        id: postId,
        images,
        isLike,
        contents,
        likeCount,
        isMine,
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
    const { width } = useWindowDimensions();
    const imageStyle = {
        width,
        borderRadius: 0,
    };
    return (
        <View style={[styles.container, containerStyle]}>
            <PostCard uuid={postId}>
                <View style={styles.paddingView}>
                    <PostHeader
                        profileImage={profile}
                        isFollow={isFollow}
                        nickname={nickname}
                        showFollowButton={!isMine && showFollowButton}
                        onPressFollow={onPressFollow}
                        onPressPostOptionsMenu={onPressPostOptionsMenu}
                        onPressProfile={onPressProfile}
                    />
                </View>
                <PostCardImageCarousel images={images} style={imageStyle} onDoublePress={onDoublePressImageCarousel} />
                <View style={styles.paddingView}>
                    <Interactive
                        imageCount={images.length}
                        isLike={isLike}
                        onPressComment={onPressComment}
                        onPressHeart={onPressHeart}
                    />
                    <NotificationPostContents
                        post={{ id: postId, contents, likeCount }}
                        onPressTag={onPressTag}
                        onPressLikeContents={onPressLikeContents}
                    />
                </View>
            </PostCard>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },
    paddingView: {
        paddingHorizontal: 15,
    },
});
