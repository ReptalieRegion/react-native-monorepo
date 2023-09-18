import { useRoute } from '@react-navigation/native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CommentRenderItem from '../organisms/CommentRenderItem';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentBottomSheetRouteProp } from '<SharePostRoutes>';
import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import CustomRefreshControl from '@/components/common/loading/CustomRefreshControl';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentFlashList = () => {
    const flashListRef = useRef<FlashList<SharePostCommentData>>(null);
    const { params } = useRoute<SharePostCommentBottomSheetRouteProp<'main'>>();
    const {
        post: { id: postId },
    } = params;

    console.log(postId);
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useInfiniteComment({ postId });

    const renderItem: ListRenderItem<SharePostCommentData> = useCallback((props) => {
        return <CommentRenderItem comment={props.item.comment} user={props.item.user} />;
    }, []);

    const keyExtractor = useCallback((item: SharePostCommentData) => item.comment.id, []);

    const onEndReached = useCallback(
        () => hasNextPage && !isFetchingNextPage && fetchNextPage(),
        [fetchNextPage, hasNextPage, isFetchingNextPage],
    );

    const asyncOnRefresh = useCallback(async () => {
        await refetch();
    }, [refetch]);

    return (
        <View style={styles.container}>
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
                estimatedItemSize={110}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            />
        </View>
    );
};

const contentContainerStyle = { paddingLeft: 20, paddingRight: 20 };

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default CommentFlashList;
