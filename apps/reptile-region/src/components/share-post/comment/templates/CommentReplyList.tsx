import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentReplyRenderItem from '../organisms/CommentReplyRenderItem';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentReplyList = () => {
    const flashListRef = useRef<FlashList<SharePostCommentReplyData>>(null);
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteCommentReply({ commentId: params.comment.id });

    const newData = useMemo(() => data?.pages.flatMap((page) => page.items), [data?.pages]);

    const keyExtractor = useCallback((item: SharePostCommentReplyData) => item.comment.id, []);

    const renderItem: ListRenderItem<SharePostCommentReplyData> = useCallback((props) => {
        return (
            <View style={styles.renderItemContainer}>
                <CommentReplyRenderItem comment={props.item.comment} user={props.item.user} />
            </View>
        );
    }, []);

    const ListHeaderComponent = useCallback(
        () => <CommentReplyRenderItem comment={params.comment} user={params.user} />,
        [params],
    );

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                data={newData}
                keyExtractor={keyExtractor}
                renderItem={renderItem}
                onEndReached={onEndReached}
                estimatedItemSize={100}
                scrollEventThrottle={16}
                ListHeaderComponent={ListHeaderComponent}
                ListHeaderComponentStyle={styles.comment}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2,
    },
    renderItemContainer: {
        paddingLeft: 60,
        paddingRight: 20,
    },
    comment: {
        paddingLeft: 20,
        paddingBottom: 10,
        backgroundColor: color.Gray[100].toString(),
    },
});

export default CommentReplyList;
