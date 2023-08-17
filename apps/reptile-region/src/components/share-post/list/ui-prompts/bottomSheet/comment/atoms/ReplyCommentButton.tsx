import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { color } from '../../../../../../common/tokens/colors';

interface ReplyCommentButtonProps {
    onPress?: () => void;
    isFetching: boolean;
    isHideComment: boolean;
    props: Pick<SharePostCommentData, 'replyCommentCount'>;
}

const ReplyCommentButton = ({ onPress, isFetching, isHideComment, props: { replyCommentCount } }: ReplyCommentButtonProps) => {
    return replyCommentCount !== 0 ? (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.padding, styles.center]}>
                <View style={styles.border} />
                {isFetching ? (
                    <ActivityIndicator />
                ) : (
                    <Text style={styles.text}>{isHideComment ? '댓글 숨기기' : `댓글 ${replyCommentCount}개 보기`}</Text>
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
