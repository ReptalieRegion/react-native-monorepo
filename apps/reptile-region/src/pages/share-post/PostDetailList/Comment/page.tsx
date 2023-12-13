import { color } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { PostDetailModalListScreenProps } from '../type';

import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import Comment, { CommentTextEditor } from '@/components/share-post/organisms/Comment';
import CommentItem from '@/components/share-post/organisms/Comment/components/CommentItem';
import useCommentActions from '@/hooks/share-post/actions/useCommentActions';
import usePostDetailNavigation from '@/hooks/share-post/navigation/usePostDetailNavigation';
import type { FetchCommentResponse } from '@/types/apis/share-post/comment';

type SharePostDetailModalPageState = PostDetailModalListScreenProps & {
    ListHeaderComponent: React.JSX.Element;
};

export default function SharePostDetailModalPage({
    route: {
        params: { postId },
    },
    ListHeaderComponent,
}: SharePostDetailModalPageState) {
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
            navigateDetailPage({ user: { isFollow: false, nickname, profile } });
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
                    renderItem={renderItem}
                    estimatedItemSize={150}
                    onEndReached={handleFetchNextPage}
                    ListHeaderComponent={ListHeaderComponent}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                />
                <CommentTextEditor />
            </Animated.View>
        </Comment>
    );
}

const contentContainerStyle: ContentStyle = {
    paddingBottom: 20,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 20,
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
