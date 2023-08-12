import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import RenderItem from '../atoms/RenderItem';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';
import { useInfiniteFetchReplyComments } from '@/apis/share-post';

const CommentReplyItem = memo(
    (item: SharePostCommentReplyData) => {
        console.log('SharePostCommentReplyData');
        return (
            <View style={styles.commentItemContainer}>
                <RenderItem data={{ contents: item.contents, writer: item.writer, tags: item.tags }} />
            </View>
        );
    },
    (prevProps, nextProps) => {
        return prevProps.id === nextProps.id;
    },
);

type CommentReplyFlatListProps = Pick<SharePostCommentData, 'id' | 'replyCommentCount'>;

const CommentReplyFlatList = ({ id }: CommentReplyFlatListProps) => {
    const { data } = useInfiniteFetchReplyComments({ commentId: id, postId: '1', enabled: false });

    return (
        <View style={styles.replyCommentItemContainer}>
            {data?.pages.flatMap((page) => page.items.map((item) => <CommentReplyItem key={item.id} {...item} />)) ?? null}
        </View>
    );
};

const styles = StyleSheet.create({
    replyCommentItemContainer: {
        gap: 10,
    },
    commentItemContainer: {
        flexDirection: 'row',
        gap: 10,
    },
});

export default CommentReplyFlatList;
