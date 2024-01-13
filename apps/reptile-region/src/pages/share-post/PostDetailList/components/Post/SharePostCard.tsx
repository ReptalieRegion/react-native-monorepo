import { TouchableTypo, Typo } from '@crawl/design-system';
import React from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import PostHeader from '../../../@common/components/PostCard/Header';
import { Interactive, PostCardImageCarousel } from '../../../@common/contexts/SharePostCard/components';
import PostCard from '../../../@common/contexts/SharePostCard/providers/PostCard';

import { ConditionalRenderer } from '@/components/@common/atoms';
import TaggedContents from '@/pages/share-post/@common/components/TaggedContents';
import type { ImageType } from '@/types/global/image';
import { calculateTimeAgo } from '@/utils/date';

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
        createdAt: string;
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
                    <View style={styles.contentsWrapper}>
                        <ConditionalRenderer
                            condition={likeCount === 0}
                            trueContent={null}
                            falseContent={
                                <TouchableTypo variant="heading2" onPress={onPressLikeContents}>
                                    {likeCount}명이 좋아합니다.
                                </TouchableTypo>
                            }
                        />
                        <TaggedContents uuid={postId} contents={contents} onPressTag={onPressTag} />
                    </View>
                    <Typo variant="body4" color="placeholder">
                        {calculateTimeAgo(createdAt)}
                    </Typo>
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
    contentsWrapper: {
        flexDirection: 'column',
        gap: 5,
    },
});
