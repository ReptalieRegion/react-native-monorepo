import { useNavigation } from '@react-navigation/native';
import { color } from 'design-system';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native';

import CommentActions from './CommentActions';
import CommentReplyButton from './CommentReplyButton';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';
import Avatar from '@/components/common/fast-image/Avatar';
import type { TagPressHandler } from '@/components/share-post/common/atoms/TaggedContent';
import TaggedContent from '@/components/share-post/common/atoms/TaggedContent';

type RenderItemProps = {
    user: SharePostCommentData['user'];
    comment: SharePostCommentData['comment'];
    FootChildren?: ReactNode;
    showAnimated?: boolean;
};

const CommentBaseRenderItem = ({ showAnimated, user, comment }: RenderItemProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const handleProfileClick = () => {
        navigation.push('share-post/modal/detail', {
            nickname: user.nickname,
        });
    };
    const onPressTag: TagPressHandler = (content) => {
        navigation.push('share-post/modal/detail', {
            nickname: content.replace('@', ''),
        });
    };

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback onPress={handleProfileClick}>
                <Avatar
                    showAnimated={showAnimated}
                    source={{ uri: user.profile.src }}
                    priority={'high'}
                    placeholder={require('@/assets/images/avatar.png')}
                    contentFit="cover"
                />
            </TouchableNativeFeedback>
            <View style={styles.commentItemContent}>
                <View style={styles.commentItemGap}>
                    <Text onPress={handleProfileClick} style={styles.nickname} suppressHighlighting>
                        {user.nickname}
                    </Text>
                    <TaggedContent uuid={comment.id} contents={comment.contents} onPressTag={onPressTag} />
                    <CommentActions isMine={comment.isMine} />
                </View>
                <CommentReplyButton comment={comment} user={user} replyCount={comment.replyCount} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
        paddingTop: 10,
    },
    replyCommentItemContainer: {
        gap: 10,
    },
    commentItemContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    commentItemContent: {
        flex: 1,
    },
    commentItemGap: {
        gap: 5,
    },
    color: {
        color: color.Green['750'].toString(),
        fontWeight: '500',
    },
    nickname: {
        fontWeight: '500',
    },
    row: {
        flexDirection: 'row',
    },
    circle: {
        width: 30,
        height: 30,
        borderRadius: 9999,
    },
    commentActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    commentActionsText: {
        fontSize: 12,
        color: color.Gray['600'].toString(),
    },
});

export default CommentBaseRenderItem;
