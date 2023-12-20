import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';

import EmptyComment from '../empty';

import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import CommentItem from '@/components/share-post/organisms/Comment/components/CommentItem';
import useCommentActions from '@/pages/share-post/CommentList/@hooks/useCommentActions';
import useCommentNavigation from '@/pages/share-post/CommentList/@hooks/useCommentNavigation';
import type { FetchCommentResponse } from '@/types/apis/share-post/comment';
import type { CommentScreenProps } from '@/types/routes/props/share-post/comment';

export default function CommentList({ route: { params } }: CommentScreenProps) {
    const flashListRef = useRef<FlashList<FetchCommentResponse>>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteComment({ postId: params.post.id });
    const { handleDeleteButton, handlePressDeclarationButton, handlePressUpdateButton } = useCommentActions();
    const { navigateCommentReplyPage, navigateDetailPage } = useCommentNavigation();

    const renderItem: ListRenderItem<FetchCommentResponse> = useCallback(
        ({ item }) => {
            const {
                comment: {
                    id: commentId,
                    contents,
                    isMine,
                    isModified,
                    user: { id: userId, nickname, profile },
                },
            } = item;

            const handleNavigateDetailPage = () => {
                navigateDetailPage({ user: { isFollow: false, nickname, profile } });
            };

            return (
                <CommentItem
                    item={item}
                    onPressNickname={handleNavigateDetailPage}
                    onPressTag={handleNavigateDetailPage}
                    onPressDeclarationButton={handlePressDeclarationButton}
                    onPressDeleteButton={() => handleDeleteButton(commentId)}
                    onPressUpdateButton={handlePressUpdateButton}
                    onPressWriteButton={() =>
                        navigateCommentReplyPage({
                            comment: {
                                id: commentId,
                                contents,
                                isMine,
                                isModified,
                                user: { id: userId, nickname, profile },
                            },
                            isFocus: true,
                        })
                    }
                    onPressShowCommentReplyButton={() =>
                        navigateCommentReplyPage({
                            comment: {
                                id: commentId,
                                contents,
                                isMine,
                                isModified,
                                user: { id: userId, nickname, profile },
                            },
                            isFocus: false,
                        })
                    }
                />
            );
        },
        [
            handleDeleteButton,
            handlePressDeclarationButton,
            handlePressUpdateButton,
            navigateCommentReplyPage,
            navigateDetailPage,
        ],
    );

    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    return (
        <FlashList
            ref={flashListRef}
            data={data}
            contentContainerStyle={contentContainerStyle}
            keyExtractor={(item: FetchCommentResponse) => item.comment.id}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
            renderItem={renderItem}
            estimatedItemSize={100}
            scrollEventThrottle={16}
            onEndReached={onEndReached}
            ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            ListEmptyComponent={<EmptyComment />}
        />
    );
}

const contentContainerStyle: ContentStyle = {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
};
