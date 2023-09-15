import React from 'react';
import { StyleSheet, View } from 'react-native';

import CommentActionButton from './CommentActionButton';

type CommentActionsOtherUserProps = {
    id: string;
    nickname: string;
};
const CommentActionsOtherUser = ({ id, nickname }: CommentActionsOtherUserProps) => {
    const handleCommentReply = () => {
        /** @TODO 댓글 쓰기  */
        console.log(nickname);
    };
    const handleDeclaration = () => {
        /** @TODO 신고 로직 */
        console.log(id);
    };

    return (
        <View style={styles.container}>
            <CommentActionButton text="댓글 쓰기" onPress={handleCommentReply} />
            <CommentActionButton text="신고" onPress={handleDeclaration} />
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

export default CommentActionsOtherUser;
