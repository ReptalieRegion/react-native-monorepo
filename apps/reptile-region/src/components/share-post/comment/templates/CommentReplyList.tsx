import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CommentReplyBaseRenderItem from '../organisms/CommentReplyRenderItem';
import CommentReplyRenderItem from '../organisms/CommentReplyRenderItem';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import CustomRefreshControl from '@/components/common/loading/CustomRefreshControl';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentReplyList = () => {
    const flashListRef = useRef<FlashList<SharePostCommentData>>(null);
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { comment, user } = params;
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, remove, refetch } = useInfiniteCommentReply({
        commentId: comment.id,
    });

    const renderItem: ListRenderItem<SharePostCommentData> = useCallback((props) => {
        return <CommentReplyRenderItem comment={props.item.comment} user={props.item.user} />;
    }, []);

    const keyExtractor = useCallback((item: SharePostCommentData) => item.comment.id, []);

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
            <View style={styles.comment}>
                <CommentReplyBaseRenderItem comment={comment} user={user} />
            </View>
            <View style={styles.flatContainer}>
                <FlashList
                    ref={flashListRef}
                    contentContainerStyle={contentContainerStyle}
                    data={data?.pages.flatMap((page) => page.items)}
                    refreshControl={<CustomRefreshControl asyncOnRefresh={asyncOnRefresh} />}
                    renderItem={renderItem}
                    scrollEventThrottle={16}
                    keyExtractor={keyExtractor}
                    onEndReached={onEndReached}
                    renderScrollComponent={ScrollView}
                    estimatedItemSize={100}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                    removeClippedSubviews={true}
                />
            </View>
        </View>
    );
};

const contentContainerStyle = { paddingLeft: 20, paddingRight: 20 };

const styles = StyleSheet.create({
    flatContainer: {
        flex: 1,
        minHeight: 2,
        paddingLeft: 40,
    },
    container: {
        flex: 1,
    },
    comment: {
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: color.Teal[250].alpha(0.07).toString(),
    },
});

export default CommentReplyList;
