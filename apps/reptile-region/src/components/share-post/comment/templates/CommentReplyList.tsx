import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { color } from 'design-system';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CommentReplyBaseRenderItem from '../atoms/CommentReplyBaseRenderItem';
import CommentSkeleton from '../atoms/CommentSkeleton';
import CommentRenderItem from '../molecules/CommentRenderItem';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useInfiniteCommentReply from '@/apis/share-post/comment-reply/hooks/queries/useInfiniteComment';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentReplyList = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'reply'>>();
    const { comment, user } = params;
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, remove, refetch } = useInfiniteCommentReply({
        commentId: comment.id,
    });
    const [refreshing, setRefreshing] = useState(false);
    const alreadyRenderItems = useRef<{ [key: string]: boolean }>({});
    const flashListRef = useRef<FlashList<SharePostCommentData>>(null);

    useEffect(() => {
        return () => {
            remove();
        };
    }, [remove]);

    const renderItem: ListRenderItem<SharePostCommentData> = useCallback((props) => {
        const commentReplyId = props.item.comment.id;
        const isAlreadyRenderItem = alreadyRenderItems.current[commentReplyId];
        alreadyRenderItems.current[commentReplyId] = true;

        return <CommentRenderItem {...props} isAlreadyRenderItem={isAlreadyRenderItem} />;
    }, []);

    const keyExtractor = useCallback((item: SharePostCommentData) => item.comment.id, []);

    const onEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    const onRefresh = () => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    };

    if (isLoading) {
        return (
            <View style={[styles.container, contentContainerStyle]}>
                <CommentSkeleton />
            </View>
        );
    }

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
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
        backgroundColor: color.Teal[250].alpha(0.07).toString(),
    },
});

export default CommentReplyList;
