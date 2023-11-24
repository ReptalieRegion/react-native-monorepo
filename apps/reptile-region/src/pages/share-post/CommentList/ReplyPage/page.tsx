import { color } from '@reptile-region/design-system';
import type { ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import type { CommentReplyScreenProps } from './type';

import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import CommentReplyItem from '@/components/share-post/organisms/Comment/components/CommentReplyItem';
import useCommentActions from '@/hooks/share-post/actions/useCommentActions';
import useCommentReplyActions from '@/hooks/share-post/actions/useCommentReplyActions';
import useCommentNavigation from '@/hooks/share-post/navigation/useCommentNavigation';
import type { FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';

export default function CommentReplyList({ route: { params } }: CommentReplyScreenProps) {
    const flashListRef = useRef<FlashList<FetchCommentReplyResponse>>(null);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteCommentReply({
        commentId: params.comment.id,
    });

    const { navigateDetailPage } = useCommentNavigation();
    const { handleDeleteButton: handleCommentDeleteButton } = useCommentActions();
    const {
        handleDeleteButton: handleCommentReplyDeleteButton,
        handlePressDeclarationButton,
        handlePressUpdateButton,
        handlePressWriteButton,
    } = useCommentReplyActions();

    const keyExtractor = useCallback((item: FetchCommentReplyResponse) => item.commentReply.id, []);

    const renderItem: ListRenderItem<FetchCommentReplyResponse> = useCallback(
        ({ item }) => {
            const {
                commentReply: {
                    id: commentReplyId,
                    user: { nickname, profile },
                },
            } = item;

            const handleNavigateDetailPage = () => {
                navigateDetailPage({ isFollow: false, nickname, profile });
            };

            return (
                <View style={styles.renderItemContainer}>
                    <CommentReplyItem
                        item={item}
                        onPressNickname={handleNavigateDetailPage}
                        onPressTag={handleNavigateDetailPage}
                        onPressDeclarationButton={handlePressDeclarationButton}
                        onPressDeleteButton={() => handleCommentReplyDeleteButton(commentReplyId)}
                        onPressUpdateButton={handlePressUpdateButton}
                        onPressWriteButton={() => handlePressWriteButton(nickname)}
                    />
                </View>
            );
        },
        [
            handlePressDeclarationButton,
            handlePressUpdateButton,
            navigateDetailPage,
            handleCommentReplyDeleteButton,
            handlePressWriteButton,
        ],
    );

    const ListHeaderComponent = useCallback(() => {
        const {
            comment: {
                id: commentId,
                contents,
                isMine,
                isModified,
                user: { id: userId, nickname, profile },
            },
        } = params;

        const handleNavigateDetailPage = () => {
            navigateDetailPage({ isFollow: false, nickname, profile });
        };

        return (
            <CommentReplyItem
                item={{
                    commentReply: {
                        id: commentId,
                        contents,
                        isMine,
                        isModified,
                        user: { id: userId, nickname, profile },
                    },
                }}
                onPressDeclarationButton={handlePressDeclarationButton}
                onPressDeleteButton={() => handleCommentDeleteButton(commentId)}
                onPressNickname={handleNavigateDetailPage}
                onPressTag={handleNavigateDetailPage}
                onPressUpdateButton={handlePressUpdateButton}
                onPressWriteButton={() => handlePressWriteButton(nickname)}
            />
        );
    }, [
        handleCommentDeleteButton,
        handlePressDeclarationButton,
        handlePressUpdateButton,
        handlePressWriteButton,
        navigateDetailPage,
        params,
    ]);

    const onEndReached = () => hasNextPage && !isFetchingNextPage && fetchNextPage();

    return (
        <FlashList
            ref={flashListRef}
            data={data}
            renderItem={renderItem}
            estimatedItemSize={100}
            scrollEventThrottle={16}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            ListHeaderComponent={<ListHeaderComponent />}
            ListHeaderComponentStyle={styles.listHeader}
            ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
        />
    );
}

const styles = StyleSheet.create({
    renderItemContainer: {
        paddingLeft: 60,
        paddingRight: 20,
    },
    listHeader: {
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: color.Gray[100].toString(),
    },
});
