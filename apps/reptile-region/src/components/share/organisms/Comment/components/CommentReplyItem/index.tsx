import { TouchableTypo, Typo } from 'design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CommentActionButtons, { CommentActionButtonsAction } from '../ActionButtons';

import { FetchCommentReplyResponse } from '<api/share/post/comment-reply>';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { Avatar } from '@/components/@common/atoms';
import TaggedContent from '@/components/share-post/common/atoms/TaggedContent';

type CommentListProps = {
    item: FetchCommentReplyResponse;
};

interface CommentListActions extends CommentActionButtonsAction {
    onPressNickname(nickname: string): void;
    onPressTag(nickname: string): void;
}

export default function CommentItem({
    item: {
        commentReply: {
            id: commentId,
            contents,
            isMine,
            isModified,
            user: { nickname, profile },
        },
    },
    onPressNickname,
    onPressTag,
    onPressDeclarationButton,
    onPressDeleteButton,
    onPressUpdateButton,
    onPressWriteButton,
}: CommentListProps & CommentListActions) {
    const handlePressNickname = () => {
        onPressNickname(nickname);
    };

    const handlePressTag = (tag: string) => {
        onPressTag(tag);
    };

    return (
        <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
            <Avatar
                recyclingKey={profile.src}
                onPress={handlePressNickname}
                source={{ uri: profile.src }}
                priority={'high'}
                contentFit="cover"
                placeholderContentFit="cover"
                placeholder={require('@/assets/images/avatar.png')}
            />
            <View style={styles.commentItemContent}>
                <View style={styles.contentHeaderContainer}>
                    <TouchableTypo variant="title4" onPress={handlePressNickname}>
                        {nickname}
                    </TouchableTypo>
                    <ConditionalRenderer
                        condition={isModified}
                        trueContent={
                            <Typo variant="body5" color="placeholder">
                                (수정됨)
                            </Typo>
                        }
                        falseContent={null}
                    />
                </View>
                <TaggedContent uuid={commentId} contents={contents} onPressTag={handlePressTag} />
                <CommentActionButtons
                    comment={{
                        id: commentId,
                        contents,
                        isMine,
                    }}
                    onPressWriteButton={onPressWriteButton}
                    onPressUpdateButton={onPressUpdateButton}
                    onPressDeleteButton={onPressDeleteButton}
                    onPressDeclarationButton={onPressDeclarationButton}
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10,
    },
    commentItemContent: {
        flexDirection: 'column',
        flex: 1,
        gap: 5,
    },
    contentHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});
