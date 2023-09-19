import React from 'react';
import { StyleSheet, View } from 'react-native';

import TaggedContent from '../../common/atoms/TaggedContent';
import CommentActions from '../atoms/CommentActions';
import type { ActionButton } from '../atoms/CommentActions';
import CommentContentsHeader from '../atoms/CommentContentsHeader';

type CommentContentsProps = {
    user: {
        nickname: string;
    };
    comment: {
        id: string;
        contents: string;
        isMine: boolean;
        isModified: boolean;
    };
    actionButtons: ActionButton[];
};

const CommentContents = ({ user, comment, actionButtons }: CommentContentsProps) => {
    return (
        <View style={styles.commentItemGap}>
            <CommentContentsHeader user={{ nickname: user.nickname }} comment={{ isModified: comment.isModified }} />
            <TaggedContent uuid={comment.id} contents={comment.contents} />
            <CommentActions actionButtons={actionButtons} isMine={comment.isMine} />
        </View>
    );
};

const styles = StyleSheet.create({
    commentItemGap: {
        gap: 5,
    },
});

export default CommentContents;
