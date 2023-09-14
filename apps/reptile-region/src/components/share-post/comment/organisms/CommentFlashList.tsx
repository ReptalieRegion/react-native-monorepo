import { FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { RefreshControl, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CommentSkeleton from '../atoms/CommentSkeleton';
import CommentRenderItem from '../molecules/CommentRenderItem';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import useInfiniteComment from '@/apis/share-post/comment/hooks/queries/useInfiniteComment';
import ListFooterLoading from '@/components/common/loading/ListFooterComponent';

const CommentFlashList = ({ postId }: { postId: string }) => {
    const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage, remove, refetch } = useInfiniteComment({ postId });
    const [refreshing, setRefreshing] = useState(false);
    const alreadyRenderItems = useRef<{ [key: string]: boolean }>({});
    const flashListRef = useRef<FlashList<SharePostCommentData>>(null);

    useEffect(() => {
        return () => {
            remove();
        };
    }, [remove]);

    const renderItem: ListRenderItem<SharePostCommentData> = useCallback((props) => {
        const commentId = props.item.comment.id;
        const isAlreadyRenderItem = alreadyRenderItems.current[commentId];
        alreadyRenderItems.current[commentId] = true;

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
