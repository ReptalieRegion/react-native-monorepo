import { TouchableTypo, Typo } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

import CommentActionButtons from '../ActionButtons';
import type { CommentActionButtonsAction } from '../ActionButtons';

import type { FetchCommentResponse } from '<api/share/post/comment>';
import { ConditionalRenderer } from '@/components/@common/atoms';
import { Avatar } from '@/components/@common/atoms';
import TaggedContents from '@/components/share-post/molecules/TaggedContents';

type CommentListProps = {
    item: FetchCommentResponse;
};

interface CommentListActions extends CommentActionButtonsAction {
    onPressNickname(nickname: string): void;
    onPressTag(nickname: string): void;
    onPressShowCommentReplyButton(commentId: string): void;
}

export default function CommentItem({
    item: {
        comment: {
            id: commentId,
            contents,
            isMine,
            isModified,
            replyCount,
            user: { nickname, profile },
        },
    },
    onPressNickname,
    onPressTag,
    onPressShowCommentReplyButton,
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

    const handlePressShowReplyButton = () => {
        onPressShowCommentReplyButton(commentId);
    };

    return (
        <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
            <Avatar
                recyclingKey={profile.src}
                onPress={handlePressNickname}
                image={{ src: profile.src }}
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
                <TaggedContents uuid={commentId} contents={contents} onPressTag={handlePressTag} />
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
                <ConditionalRenderer
                    condition={replyCount !== 0}
                    trueContent={
                        <View style={styles.container}>
                            <TouchableTypo variant="body4" color="secondary" onPress={handlePressShowReplyButton}>
                                답글 {replyCount}개보기
                            </TouchableTypo>
                        </View>
                    }
                    falseContent={null}
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
