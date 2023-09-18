import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CommentReplyBaseRenderItem from '../organisms/CommentReplyRenderItem';
import CommentReplyRenderItem from '../organisms/CommentReplyRenderItem';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import CustomRefreshControl from '@/components/common/loading/CustomRefreshControl';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentReplyList = () => {
    const flashListRef = useRef<FlashList<SharePostCommentReplyData>>(null);
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { comment } = params;
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, remove, refetch } = useInfiniteCommentReply({
        commentId: comment.id,
    });

    const newData = useMemo(() => {
        if (data?.pages) {
            return [params, ...data.pages.flatMap((page) => page.items)];
        }
    }, [data?.pages, params]);

    const renderItem: ListRenderItem<SharePostCommentReplyData> = useCallback((props) => {
        if (props.index === 0) {
            return (
                <View style={styles.comment}>
                    <CommentReplyBaseRenderItem comment={props.item.comment} user={props.item.user} />
                </View>
            );
        }
        return (
            <View style={styles.renderItemContainer}>
                <CommentReplyRenderItem comment={props.item.comment} user={props.item.user} />
            </View>
        );
    }, []);

    const keyExtractor = useCallback((item: SharePostCommentReplyData) => item.comment.id, []);

    const onEndReached = useCallback(() => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

    const asyncOnRefresh = useCallback(async () => {
        await refetch();
    }, [refetch]);

    useEffect(() => {
        return () => {
            remove();
        };
    }, [remove]);

    return (
        <View style={styles.container}>
            <View style={styles.flatContainer}>
                <FlashList
                    ref={flashListRef}
                    contentContainerStyle={contentContainerStyle}
                    data={newData}
                    refreshControl={<CustomRefreshControl asyncOnRefresh={asyncOnRefresh} />}
                    renderItem={renderItem}
                    scrollEventThrottle={16}
                    keyExtractor={keyExtractor}
                    onEndReached={onEndReached}
                    renderScrollComponent={ScrollView}
                    estimatedItemSize={110}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                />
            </View>
        </View>
    );
};

const contentContainerStyle = {};

const styles = StyleSheet.create({
    flatContainer: {
        flex: 1,
    },
    renderItemContainer: {
        paddingLeft: 60,
        paddingRight: 20,
    },
    container: {
        flex: 1,
    },
    comment: {
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: color.Gray[100].toString(),
    },
});

export default CommentReplyList;
