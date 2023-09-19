import { TouchableTypo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type CommentReplyButtonProps = {
    replyCount: number;
    onPress: () => void;
};

const CommentReplyButton = ({ replyCount, onPress }: CommentReplyButtonProps) => {
    if (replyCount === 0 || replyCount === undefined) {
        return null;
    }

    return (
        <View style={styles.container}>
            <TouchableTypo variant="body4" color="secondary" onPress={onPress}>
                답글 {replyCount}개보기
            </TouchableTypo>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
    },
});

export default CommentReplyButton;
