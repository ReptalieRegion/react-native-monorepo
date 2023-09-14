import { useNavigation } from '@react-navigation/native';
import { color } from 'design-system';
import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentBottomSheetNavigationProp } from '<SharePostRoutes>';

type CommentReplyButtonProps = {
    user: SharePostCommentData['user'];
    comment: SharePostCommentData['comment'];
    replyCount: number;
};

const CommentReplyButton = ({ user, comment, replyCount }: CommentReplyButtonProps) => {
    const navigation = useNavigation<SharePostCommentBottomSheetNavigationProp<'main'>>();

    const handleGoToReplyPage = () => {
        navigation.push('reply', { comment, user });
    };

    if (replyCount === 0 || replyCount === undefined) {
        return null;
    }

    return (
        <Text onPress={handleGoToReplyPage} style={styles.commentMoreButton} suppressHighlighting={false}>
            답글 {replyCount}개보기
        </Text>
    );
};

const styles = StyleSheet.create({
    commentMoreButton: {
        paddingTop: 10,
        fontSize: 12,
        color: color.Teal[150].toString(),
    },
});

export default CommentReplyButton;
