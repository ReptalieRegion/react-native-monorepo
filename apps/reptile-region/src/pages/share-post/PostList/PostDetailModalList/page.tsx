import { color } from '@reptile-region/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { PostDetailModalListScreenProps } from './type';

import type { FetchCommentResponse } from '<api/share/post/comment>';
import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import useFetchPost from '@/apis/share-post/post/hooks/queries/useFetchPost';
import { ListFooterLoading } from '@/components/@common/atoms';
import { Divider } from '@/components/@common/atoms/Divider';
import Comment, { CommentReplyTextEditor } from '@/components/share-post/organisms/Comment';
import CommentItem from '@/components/share-post/organisms/Comment/components/CommentItem';
import SharePostCardNotification from '@/components/share-post/organisms/SharePostCard/SharePostCardNotification';
import useCommentActions from '@/hooks/share-post/actions/useCommentActions';
import useSharePostActions from '@/hooks/share-post/actions/useSharePostActions';
import usePostDetailNavigation from '@/hooks/share-post/navigation/usePostDetailNavigation';
import useSharePostModalNavigation from '@/hooks/share-post/navigation/useSharePostNavigation';

export default function SharePostDetailModalPage({
    route: {
        params: { postId },
    },
}: PostDetailModalListScreenProps) {
    const { data: comments, isFetchingNextPage, hasNextPage, fetchNextPage } = useInfiniteComment({ postId });
    const { bottom } = useSafeAreaInsets();
    const { height } = useAnimatedKeyboard();
    const animatedKeyboard = useAnimatedStyle(() => {
        return {
            paddingBottom: Math.max(height.value, bottom),
        };
    });
    const { handleDeleteButton, handlePressDeclarationButton, handlePressUpdateButton } = useCommentActions();
    const { navigateCommentReplyPage, navigateDetailPage } = usePostDetailNavigation();

    const renderItem: ListRenderItem<FetchCommentResponse> = ({ item }) => {
        const {
            comment: {
                id: commentId,
                contents,
                isMine,
                isModified,
                user: { id: userId, nickname, profile },
            },
        } = item;

        const handleNavigateCommentReplyPage = () => {
            navigateCommentReplyPage({
                comment: { contents, id: commentId, isMine, isModified, user: { id: userId, nickname, profile } },
                isFocus: false,
            });
        };

        const handleNavigateDetailPage = () => {
            navigateDetailPage({ isFollow: false, nickname, profile });
        };

        return (
            <View style={styles.commentContainer}>
                <CommentItem
                    item={item}
                    onPressNickname={handleNavigateDetailPage}
                    onPressTag={handleNavigateDetailPage}
                    onPressShowCommentReplyButton={handleNavigateCommentReplyPage}
                    onPressUpdateButton={handlePressUpdateButton}
                    onPressDeleteButton={() => handleDeleteButton(commentId)}
                    onPressWriteButton={handleNavigateCommentReplyPage}
                    onPressDeclarationButton={handlePressDeclarationButton}
                />
            </View>
        );
    };

    const handleFetchNextPage = () => !isFetchingNextPage && hasNextPage && fetchNextPage();

    return (
        <Comment id={postId}>
            <Animated.View style={[styles.container, animatedKeyboard]}>
                <FlashList
                    data={comments}
                    contentContainerStyle={contentContainerStyle}
                    ListHeaderComponent={<SharePostDetailListHeader postId={postId} />}
                    renderItem={renderItem}
                    estimatedItemSize={150}
                    onEndReached={handleFetchNextPage}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                />
                <CommentReplyTextEditor />
            </Animated.View>
        </Comment>
    );
}

function SharePostDetailListHeader({ postId }: { postId: string }) {
    const { data } = useFetchPost({ postId });
    const {
        post: {
            contents,
            images,
            isLike,
            isMine,
            user: { id: userId, isFollow, nickname, profile },
        },
    } = data;
    const { handleDoublePressImageCarousel, handlePressFollow, handlePressHeart } = useSharePostActions();
    const { handlePressComment, handlePressLikeContents, handlePressPostOptionsMenu, handlePressProfile, handlePressTag } =
        useSharePostModalNavigation();

    return (
        <>
            <SharePostCardNotification
                post={data.post}
                onPressHeart={() => handlePressHeart({ postId, isLike })}
                onDoublePressImageCarousel={() => handleDoublePressImageCarousel({ postId, isLike })}
                onPressFollow={() => handlePressFollow({ userId, isFollow })}
                onPressPostOptionsMenu={() =>
                    handlePressPostOptionsMenu({ post: { id: postId, contents, images, isMine, user: { id: userId } } })
                }
                onPressProfile={() => handlePressProfile({ isFollow, nickname, profile })}
                onPressComment={() => handlePressComment({ post: { id: postId } })}
                onPressLikeContents={() => handlePressLikeContents({ postId })}
                onPressTag={handlePressTag}
            />
            <Divider />
        </>
    );
}

const contentContainerStyle: ContentStyle = {
    paddingTop: 10,
    paddingBottom: 20,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    paddingView: {
        paddingHorizontal: 15,
    },
    indicatorsContainer: {
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    header: {
        gap: 10,
    },
    item: {
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingVertical: 10,
        alignItems: 'center',
    },
    commentContainer: {
        paddingHorizontal: 15,
    },
});
