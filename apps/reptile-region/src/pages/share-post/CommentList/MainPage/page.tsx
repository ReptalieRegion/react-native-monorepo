import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl } from 'react-native';

import useReportListBottomSheet from '../../@common/bottom-sheet/ReportList/useReportListBottomSheet';
import EmptyComment from '../empty';

import useCommentActions from './hooks/useCommentActions';

import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';
import CommentItem from '@/components/share-post/organisms/Comment/components/CommentItem';
import useCommentNavigation from '@/pages/share-post/CommentList/@hooks/useCommentNavigation';
import { ReportType } from '@/types/apis/report';
import type { FetchCommentResponse } from '@/types/apis/share-post/comment';
import type { CommentScreenProps } from '@/types/routes/props/share-post/comment';

export default function CommentList({ route: { params } }: CommentScreenProps) {
    const flashListRef = useRef<FlashList<FetchCommentResponse>>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteComment({ postId: params.post.id });
    const { deleteComment } = useCommentActions();
    const { navigateCommentReplyPage, navigateDetailPage } = useCommentNavigation();
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

            return (
                <CommentItem
                    item={item}
                    onPressNickname={() => navigateDetailPage({ user: { isFollow: false, nickname, profile } })}
                    onPressTag={(tag) => navigateDetailPage({ user: { isFollow: false, nickname: tag, profile: { src: '' } } })}
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
                    onPressWriteButton={() =>
                        navigateCommentReplyPage({
                            comment: {
                                id: commentId,
                                contents,
                                isMine,
                                isModified,
                                createdAt,
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
                                createdAt,
                                user: { id: userId, nickname, profile },
                            },
                            isFocus: false,
                        })
                    }
                />
            );
        },
        [navigateDetailPage, openReportListBottomSheet, deleteComment, navigateCommentReplyPage],
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
