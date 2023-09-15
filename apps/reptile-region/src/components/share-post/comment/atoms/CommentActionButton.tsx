import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CommentActionButtonProps = {
    onPress?: () => void;
    text: string;
};

const CommentActionButton = ({ text, onPress }: CommentActionButtonProps) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={styles.commentActionsText}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    commentActionsText: {
        fontSize: 12,
        color: color.Gray['600'].toString(),
    },
});

export default CommentActionButton;
