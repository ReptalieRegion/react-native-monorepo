import { color } from '@crawl/design-system';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import CommentReplyItem from '@/components/share-post/organisms/Comment/components/CommentReplyItem';
import useCommentActions from '@/pages/share-post/CommentList/@hooks/useCommentActions';
import useCommentNavigation from '@/pages/share-post/CommentList/@hooks/useCommentNavigation';
import useCommentReplyActions from '@/pages/share-post/CommentList/@hooks/useCommentReplyActions';
import type { FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';
import type { CommentReplyScreenProps } from '@/types/routes/props/share-post/comment';

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

            return (
                <View style={styles.renderItemContainer}>
                    <CommentReplyItem
                        item={item}
                        onPressNickname={() => navigateDetailPage({ user: { isFollow: false, nickname, profile } })}
                        onPressTag={(tag) =>
                            navigateDetailPage({ user: { isFollow: false, nickname: tag, profile: { src: '' } } })
                        }
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
            navigateDetailPage({ user: { isFollow: false, nickname, profile } });
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
            contentContainerStyle={contentContainerStyle}
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

const contentContainerStyle: ContentStyle = {
    paddingBottom: 20,
};

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
