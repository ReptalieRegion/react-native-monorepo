import React from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

import { SharePostCommentData } from '<SharePostAPI>';
import { color } from '@/components/common/tokens/colors';

type ReplyCommentButtonProps = Pick<SharePostCommentData, 'replyCommentCount' | 'id'>;

const ReplyCommentButton = ({ replyCommentCount, id }: ReplyCommentButtonProps) => {
    const handleReplyShow = () => {
        console.log('댓글 보기', id);
    };

    return (
        <TouchableNativeFeedback onPress={handleReplyShow}>
            <View style={[styles.padding, styles.center]}>
                <View style={styles.border} />
                <Text style={styles.text}>댓글 {replyCommentCount}개 보기</Text>
            </View>
        </TouchableNativeFeedback>
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
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        width: 30,
    },
    text: {
        fontSize: 12,
        color: color.Gray[700].toString(),
    },
});

export default ReplyCommentButton;
