import { useNavigation } from '@react-navigation/native';
import TouchableTypo from 'design-system/lib/components/Text/TouchableTypo';
import React from 'react';
import { StyleSheet, View } from 'react-native';

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
        <View style={styles.container}>
            <TouchableTypo variant="body4" color="secondary" onPress={handleGoToReplyPage}>
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
