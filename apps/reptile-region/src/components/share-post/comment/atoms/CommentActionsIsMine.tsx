import React from 'react';
import { StyleSheet, View } from 'react-native';

import CommentActionButton from './CommentActionButton';

type CommentActionsIsMineProps = {
    updateComment: () => void;
    deleteComment: () => void;
};

const CommentActionsIsMine = ({ updateComment, deleteComment }: CommentActionsIsMineProps) => {
    return (
        <View style={styles.container}>
            <CommentActionButton text="수정" onPress={updateComment} />
            <CommentActionButton text="삭제" onPress={deleteComment} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});

export default CommentActionsIsMine;
