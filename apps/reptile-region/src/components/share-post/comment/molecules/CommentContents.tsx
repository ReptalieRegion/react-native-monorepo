import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TaggedContent from '../../common/atoms/TaggedContent';
import CommentActionsIsMine from '../atoms/CommentActionsIsMine';
import CommentActionsOtherUser from '../atoms/CommentActionsOtherUser';

import { SharePostNavigationProp } from '<SharePostRoutes>';

type CommentContentsProps = {
    user: {
        nickname: string;
    };
    comment: {
        id: string;
        contents: string;
        isMine: boolean;
    };
    deleteComment: () => void;
    updateComment: () => void;
};

const CommentContents = ({ user, comment, deleteComment, updateComment }: CommentContentsProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const handleProfileClick = () => {
        navigation.push('share-post/modal/detail', { nickname: user.nickname });
    };

    return (
        <View style={styles.commentItemGap}>
            <Text onPress={handleProfileClick} style={styles.nickname} suppressHighlighting>
                {user.nickname}
            </Text>
            <TaggedContent uuid={comment.id} contents={comment.contents} onPressTag={handleProfileClick} />
            {comment.isMine ? (
                <CommentActionsIsMine deleteComment={deleteComment} updateComment={updateComment} />
            ) : (
                <CommentActionsOtherUser id={comment.id} nickname={user.nickname} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    commentItemGap: {
        gap: 5,
    },
    nickname: {
        fontWeight: '500',
    },
});

export default CommentContents;
