import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';

import CommentRenderItem from '../organisms/CommentRenderItem';

import type { FetchCommentResponse } from '<api/share/post/comment>';
import type { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import { ListFooterLoading } from '@/components/@common/atoms';

const CommentFlashList = () => {
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'main'>>();
    const flashListRef = useRef<FlashList<FetchCommentResponse>>(null);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteComment({ postId: params.post.id });

    const renderItem: ListRenderItem<FetchCommentResponse> = useCallback(({ item }) => {
        return <CommentRenderItem item={item} />;
    }, []);

    const keyExtractor = useCallback((item: FetchCommentResponse) => item.comment.id, []);

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    const asyncOnRefresh = useCallback(async () => {
        setRefreshing(true);
        await refetch();
        setRefreshing(false);
    }, [refetch]);

    return (
        <View style={styles.container}>
            <FlashList
                ref={flashListRef}
                contentContainerStyle={contentContainerStyle}
                data={data?.pages.flatMap((page) => page.items)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={asyncOnRefresh} />}
                renderItem={renderItem}
                estimatedItemSize={100}
                scrollEventThrottle={16}
                keyExtractor={keyExtractor}
                onEndReached={onEndReached}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            />
        </View>
    );
};

const contentContainerStyle = { paddingLeft: 20, paddingRight: 20 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2,
    },
});

export default CommentFlashList;
