import { FlashList, ListRenderItem, ListRenderItemInfo } from '@shopify/flash-list';
import React, { memo, useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentBaseRenderItem from '../atoms/CommentBaseRenderItem';
import ReplyCommentButton from '../atoms/ReplyCommentButton';

import ReplyCommentRenderItem from './ReplyCommentRenderItem';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';
import { useInfiniteFetchReplyComments } from '@/apis/share-post';

type FootChildrenProps = Pick<SharePostCommentData, 'id' | 'replyCommentCount'>;

const FootChildren = memo(({ id, replyCommentCount }: FootChildrenProps) => {
    const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteFetchReplyComments({
        commentId: id,
        postId: '1',
    });
    const newData = data?.pages.flatMap((page) => page.items);
    const keyExtractor = useCallback((item: SharePostCommentReplyData) => item.id, []);
    const renderItem: ListRenderItem<SharePostCommentReplyData> = useCallback(
        ({ item }) => <ReplyCommentRenderItem {...item} />,
        [],
    );

    const onPressReplyButton = () => {
        fetchNextPage();
    };

    return (
        <>
            <View style={footChildrenStyles.container}>
                <FlashList keyExtractor={keyExtractor} data={newData} renderItem={renderItem} estimatedItemSize={200} />
            </View>
            <ReplyCommentButton
                props={{ replyCommentCount: replyCommentCount - (newData?.length ?? 0) }}
                onPress={onPressReplyButton}
                isFetching={isFetching}
                isHideComment={!hasNextPage && !!data}
            />
        </>
    );
});

const footChildrenStyles = StyleSheet.create({
    container: {
        minHeight: 2,
    },
    gapView: {
        height: 20,
    },
});

type CommentRenderItemProps = ListRenderItemInfo<SharePostCommentData>;

const CommentRenderItem = ({ item }: CommentRenderItemProps) => {
    const { contents, writer, tags, id, replyCommentCount } = item;

    useEffect(() => {
        return () => {};
    }, []);

    return (
        <CommentBaseRenderItem
            data={{ contents, writer, tags }}
            FootChildren={<FootChildren id={id} replyCommentCount={replyCommentCount} />}
        />
    );
};

export default memo(CommentRenderItem);
