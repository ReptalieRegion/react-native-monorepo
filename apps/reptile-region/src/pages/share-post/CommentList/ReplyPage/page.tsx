import { color } from '@crawl/design-system';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import useReportListBottomSheet from '../../@common/bottom-sheet/ReportList/useReportListBottomSheet';

import useCommentReplyActions from './hooks/useCommentReplyActions';

import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import CommentReplyItem from '@/components/share-post/organisms/Comment/components/CommentReplyItem';
import useCommentNavigation from '@/pages/share-post/CommentList/@hooks/useCommentNavigation';
import { ReportType } from '@/types/apis/report';
import type { FetchCommentReplyResponse } from '@/types/apis/share-post/comment-reply';
import type { CommentReplyScreenProps } from '@/types/routes/props/share-post/comment';

export default function CommentReplyList({ route: { params } }: CommentReplyScreenProps) {
    const flashListRef = useRef<FlashList<FetchCommentReplyResponse>>(null);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteCommentReply({
        commentId: params.comment.id,
    });

    const { navigateDetailPage } = useCommentNavigation();
    const openReportListBottomSheet = useReportListBottomSheet();

    const { deleteComment, deleteCommentReply, handlePressWriteButton } = useCommentReplyActions();

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
                        onPressDeclarationButton={() =>
                            openReportListBottomSheet({
                                report: {
                                    reported: item.commentReply.user.id,
                                    type: ReportType.REPLY,
                                    typeId: item.commentReply.id,
                                },
                            })
                        }
                        onPressDeleteButton={() => deleteCommentReply(commentReplyId)}
                        onPressWriteButton={() => handlePressWriteButton(nickname)}
                    />
                </View>
            );
        },
        [navigateDetailPage, openReportListBottomSheet, deleteCommentReply, handlePressWriteButton],
    );

    const ListHeaderComponent = useCallback(() => {
        const {
            comment: {
                id: commentId,
                contents,
                isMine,
                isModified,
                createdAt,
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
                        createdAt,
                        user: { id: userId, nickname, profile },
                    },
                }}
                onPressDeclarationButton={() =>
                    openReportListBottomSheet({
                        report: {
                            reported: userId,
                            type: ReportType.COMMENT,
                            typeId: commentId,
                        },
                    })
                }
                onPressDeleteButton={() => deleteComment(commentId)}
                onPressNickname={handleNavigateDetailPage}
                onPressTag={handleNavigateDetailPage}
                onPressWriteButton={() => handlePressWriteButton(nickname)}
            />
        );
    }, [deleteComment, handlePressWriteButton, navigateDetailPage, openReportListBottomSheet, params]);

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

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
            ListHeaderComponent={ListHeaderComponent}
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
