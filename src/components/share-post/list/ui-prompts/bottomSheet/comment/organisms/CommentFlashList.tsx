import { ContentStyle, FlashList, ListRenderItem } from '@shopify/flash-list';
import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import CommentRenderItem from '../molecules/CommentRenderItem';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { useInfiniteFetchCommentsPost } from '@/apis/share-post';
import ListFooterLoading from '@/components/share-post/common/atoms/ListFooterComponent';

const CommentFlashList = ({ postId }: { postId: string }) => {
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useInfiniteFetchCommentsPost(postId);
    const renderItem: ListRenderItem<SharePostCommentData> = useCallback((props) => <CommentRenderItem {...props} />, []);
    const keyExtractor = useCallback((item: SharePostCommentData) => item.id, []);
    const onEndReached = () => {
        if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    };

    return (
        <View style={styles.container}>
            <FlashList
                contentContainerStyle={contentContainerStyle}
                data={data?.pages.flatMap((page) => page.items)}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                onEndReached={onEndReached}
                renderScrollComponent={ScrollView}
                estimatedItemSize={100}
                ListFooterComponent={<ListFooterLoading isLoading={isFetchingNextPage} />}
            />
        </View>
    );
};

const contentContainerStyle: ContentStyle = {
    padding: 20,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: 2,
    },
});

export default CommentFlashList;
