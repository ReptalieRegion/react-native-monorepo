import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { color } from '@/components/common/tokens/colors';

type CommentActionsProps = {
    comment: Pick<SharePostCommentData['comment'], 'isMine'>;
};

const CommentActions = ({ comment }: CommentActionsProps) => {
    return (
        <View style={styles.commentActions}>
            <Text style={styles.commentActionsText}>댓글 쓰기</Text>
            <Text style={styles.commentActionsText}>신고</Text>
            {comment.isMine ? (
                <>
                    <Text style={styles.commentActionsText}>수정</Text>
                    <Text style={styles.commentActionsText}>삭제</Text>
                </>
            ) : null}
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
