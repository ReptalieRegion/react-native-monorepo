import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { color } from '../../../../../../common/tokens/colors';

const CommentActions = () => {
    return (
        <View style={styles.commentActions}>
            <Text style={styles.commentActionsText}>댓글 쓰기</Text>
            <Text style={styles.commentActionsText}>신고</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    commentActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    commentActionsText: {
        fontSize: 12,
        color: color.Gray['600'].toString(),
    },
});

export default CommentActions;
