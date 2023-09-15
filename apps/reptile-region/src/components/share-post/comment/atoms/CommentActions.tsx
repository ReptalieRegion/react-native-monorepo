import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import useDeleteComment from '@/apis/share-post/comment/hooks/mutations/useDeleteComment';

type CommentActionsProps = {
    isMine: boolean;
    commentId: string;
};

const CommentActions = ({ commentId, isMine }: CommentActionsProps) => {
    const { mutate } = useDeleteComment();

    return (
        <View style={styles.commentActions}>
            {isMine ? (
                <>
                    <Text style={styles.commentActionsText}>수정</Text>
                    <Text style={styles.commentActionsText} onPress={() => mutate({ commentId })}>
                        삭제
                    </Text>
                </>
            ) : (
                <>
                    <Text style={styles.commentActionsText}>댓글 쓰기</Text>
                    <Text style={styles.commentActionsText}>신고</Text>
                </>
            )}
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
