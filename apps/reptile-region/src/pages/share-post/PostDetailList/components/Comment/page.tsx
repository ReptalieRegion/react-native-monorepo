import { color } from '@crawl/design-system';
import { FlashList, type ContentStyle, type ListRenderItem } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import usePostDetailCommentActions from '../../hooks/usePostDetailCommentActions';

import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import Comment, { CommentTextEditor } from '@/components/share-post/organisms/Comment';
import CommentItem from '@/components/share-post/organisms/Comment/components/CommentItem';
import useReportListBottomSheet from '@/pages/share-post/@common/bottom-sheet/ReportList/useReportListBottomSheet';
import usePostDetailNavigation from '@/pages/share-post/PostDetailList/hooks/usePostDetailNavigation';
import { ReportType } from '@/types/apis/report';
import type { FetchCommentResponse } from '@/types/apis/share-post/comment';
import type { PostDetailModalListScreenProps } from '@/types/routes/props/share-post/post-detail';

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
    const { deleteComment } = usePostDetailCommentActions();
    const { navigateCommentReplyPage, navigateDetailPage } = usePostDetailNavigation();
    const openReportListBottomSheet = useReportListBottomSheet();

    const renderItem: ListRenderItem<FetchCommentResponse> = useCallback(
        ({ item }) => {
            const {
                comment: {
                    id: commentId,
                    contents,
                    isMine,
                    isModified,
                    createdAt,
                    user: { id: userId, nickname, profile },
                },
            } = item;

            const handleNavigateCommentReplyPage = () => {
                navigateCommentReplyPage({
                    comment: {
                        contents,
                        id: commentId,
                        isMine,
                        isModified,
                        createdAt,
                        user: { id: userId, nickname, profile },
                    },
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
                        onPressDeleteButton={() => deleteComment(commentId)}
                        onPressWriteButton={handleNavigateCommentReplyPage}
                        onPressDeclarationButton={() =>
                            openReportListBottomSheet({
                                report: {
                                    reported: userId,
                                    type: ReportType.COMMENT,
                                    typeId: userId,
                                },
                            })
                        }
                    />
                </View>
            );
        },
        [deleteComment, navigateCommentReplyPage, navigateDetailPage, openReportListBottomSheet],
    );

    const handleFetchNextPage = useCallback(
        () => !isFetchingNextPage && hasNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    const { bottom } = useSafeAreaInsets();
    const { height } = useAnimatedKeyboard();
    const animatedKeyboard = useAnimatedStyle(() => ({
        paddingBottom: Math.max(height.value, bottom),
    }));

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
