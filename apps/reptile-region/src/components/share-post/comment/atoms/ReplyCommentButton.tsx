import { color } from 'design-system';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { SharePostCommentData } from '<SharePostCommentAPI>';

interface ReplyCommentButtonProps {
    onPress?: () => void;
    isFetching: boolean;
    isHideComment: boolean;
    comment: Pick<SharePostCommentData['comment'], 'replyCount'>;
}

const ReplyCommentButton = ({ onPress, isFetching, isHideComment, comment: { replyCount } }: ReplyCommentButtonProps) => {
    return replyCount !== 0 ? (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.padding, styles.center]}>
                <View style={styles.border} />
                {isFetching ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.text}>{isHideComment ? '댓글 숨기기' : `댓글 ${replyCount}개 보기`}</Text>
                )}
            </View>
        </TouchableWithoutFeedback>
    ) : (
        <View style={styles.padding} />
    );
};

const styles = StyleSheet.create({
    padding: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    center: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    border: {
        borderColor: color.Gray[700].toString(),
        borderBottomWidth: 0.5,
        width: 30,
    },
    text: {
        fontSize: 12,
        color: color.Gray[700].toString(),
    },
});

export default ReplyCommentButton;
