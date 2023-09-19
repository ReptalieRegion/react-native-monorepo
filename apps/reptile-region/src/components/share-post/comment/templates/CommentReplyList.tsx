import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentTextInput from '../atoms/CommentTextInput';
import CommentReplyRenderItem from '../organisms/CommentReplyRenderItem';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useCreateCommentReply from '@/apis/share-post/comment-reply/hooks/mutations/useCreateCommentReply';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentReplyList = () => {
    const flashListRef = useRef<FlashList<SharePostCommentReplyData>>(null);
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteCommentReply({ commentId: params.comment.id });
    const { mutate } = useCreateCommentReply();

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

    const handleCommentReplySubmit = useCallback(
        (contents: string) => mutate({ contents, commentId: params.comment.id }),
        [mutate, params.comment.id],
    );

    return (
        <>
            <View style={styles.container}>
                <FlashList
                    ref={flashListRef}
                    data={newData}
                    keyExtractor={keyExtractor}
                    renderItem={renderItem}
                    onEndReached={onEndReached}
                    estimatedItemSize={110}
                    scrollEventThrottle={16}
                    ListHeaderComponent={ListHeaderComponent}
                    ListHeaderComponentStyle={styles.comment}
                    ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
                />
            </View>
            <CommentTextInput onSubmit={handleCommentReplySubmit} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
