import { TouchableTypo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { CommentActionButtonsAction } from '../../../@common/contexts/Comment/components/ActionButtons';
import CommentActionButtons from '../../../@common/contexts/Comment/components/ActionButtons';

import { Avatar, ConditionalRenderer } from '@/components/@common/atoms';
import TaggedContents from '@/pages/share-post/@common/components/TaggedContents';
import CommentHeader, { type CommentHeaderProps } from '@/pages/share-post/@common/contexts/Comment/components/CommentHeader';
import CommentTemplate from '@/pages/share-post/@common/contexts/Comment/components/CommentTemplate';
import type { FetchCommentResponse } from '@/types/apis/share-post/comment';

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
            createdAt,
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
}: CommentListProps & CommentListActions & Pick<CommentHeaderProps, 'onPressNickname'>) {
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
        <CommentTemplate
            imageComponent={
                <Avatar
                    recyclingKey={profile.src}
                    onPress={handlePressNickname}
                    image={{ src: profile.src }}
                    priority={'high'}
                    contentFit="cover"
                    placeholderContentFit="cover"
                    placeholder={require('@/assets/images/avatar.png')}
                />
            }
            contentComponent={
                <>
                    <CommentHeader
                        comment={{ createdAt, isModified, user: { nickname } }}
                        onPressNickname={handlePressNickname}
                    />
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
                </>
            }
        />
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10,
    },
});
