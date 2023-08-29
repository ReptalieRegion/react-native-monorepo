import React, { memo } from 'react';
import { StyleSheet, View } from 'react-native';

import CommentBaseRenderItem from '../atoms/CommentBaseRenderItem';

import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';

const ReplyCommentRenderItem = (item: SharePostCommentReplyData) => {
    return (
        <View style={styles.container}>
            <CommentBaseRenderItem user={item.user} comment={item.comment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
    },
});

export default memo(ReplyCommentRenderItem);
