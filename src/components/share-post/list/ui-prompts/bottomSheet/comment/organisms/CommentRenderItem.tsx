import React, { memo, useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import RenderItem from '../atoms/RenderItem';
import ReplyCommentButton from '../atoms/ReplyCommentButton';
import CommentReplyFlatList from '../molecules/CommentReplyFlatList';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { useInfiniteFetchCommentsPost } from '@/apis/share-post';
import ListFooterLoading from '@/components/share-post/common/atoms/ListFooterComponent';

const FootChildren = ({ id, replyCommentCount }: Pick<SharePostCommentData, 'id' | 'replyCommentCount'>) => {
    const [isShowCommentReply, setIsShowCommentReply] = useState<boolean>(false);
    return (
        <View style={styles.padding}>
            {isShowCommentReply ? <CommentReplyFlatList id={id} replyCommentCount={replyCommentCount} /> : null}
            <ReplyCommentButton
                onPress={(hasNextPage) => setIsShowCommentReply(hasNextPage ?? false)}
                props={{ id, replyCommentCount }}
            />
        </View>
    );
};

const CommentRenderItem = memo(
    (item: SharePostCommentData) => {
        return (
            <View style={styles.commentItemContainer}>
                <RenderItem
                    data={{
                        contents: item.contents,
                        writer: item.writer,
                        tags: item.tags,
                    }}
                    FootChildren={<FootChildren id={item.id} replyCommentCount={item.replyCommentCount} />}
                />
            </View>
        );
    },
    (prevProps, nextProps) => prevProps.id === nextProps.id,
);

export const CommentFlatList = ({ postId }: { postId: string }) => {
    const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } = useInfiniteFetchCommentsPost(postId);
    const ListFooterComponent = ListFooterLoading(isFetchingNextPage);
    const renderItem = useCallback((item: SharePostCommentData) => <CommentRenderItem {...item} />, []);

    return (
        <FlatList
            contentContainerStyle={styles.commentContainer}
            data={data?.pages.flatMap((page) => page.items)}
            keyExtractor={(item, index) => item.id + index}
            renderItem={({ item }) => renderItem(item)}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.5}
            onEndReached={() => hasNextPage && !isLoading && !isFetchingNextPage && fetchNextPage()}
            ListFooterComponent={ListFooterComponent}
        />
    );
};

const styles = StyleSheet.create({
    commentContainer: {
        padding: 20,
        gap: 20,
    },
    padding: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    replyCommentItemContainer: {
        gap: 10,
    },
    commentItemContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});
