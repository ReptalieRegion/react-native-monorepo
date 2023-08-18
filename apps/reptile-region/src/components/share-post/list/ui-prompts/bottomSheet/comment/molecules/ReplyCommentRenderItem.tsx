import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentBaseRenderItem from '../atoms/CommentBaseRenderItem';

import { SharePostCommentReplyData } from '<SharePostCommentReply>';

const ReplyCommentRenderItem = (item: SharePostCommentReplyData) => {
    return (
        <View style={styles.container}>
            <CommentBaseRenderItem data={{ contents: item.contents, writer: item.writer, tags: item.tags }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

export default memo(ReplyCommentRenderItem);
