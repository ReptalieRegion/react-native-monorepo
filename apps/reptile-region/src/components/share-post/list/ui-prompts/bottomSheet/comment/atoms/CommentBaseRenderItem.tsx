import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CommentActions from './CommentActions';

import type { SharePostCommentData } from '<SharePostCommentAPI>';
import type { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';
import Avatar from '@/components/common/fast-image/Avatar';
import { color } from '@/components/common/tokens/colors';
import type { TagPressHandler } from '@/components/share-post/common/atoms/TaggedContent';
import TaggedContent from '@/components/share-post/common/atoms/TaggedContent';

type RenderItemProps =
    | {
          user: SharePostCommentData['user'];
          comment: SharePostCommentData['comment'];
          FootChildren?: ReactNode;
          showAnimated?: boolean;
      }
    | {
          user: SharePostCommentReplyData['user'];
          comment: SharePostCommentReplyData['comment'];
          FootChildren?: ReactNode;
          showAnimated?: boolean;
      };

const CommentBaseRenderItem = ({ FootChildren, showAnimated, user, comment }: RenderItemProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/bottom-sheet/comment'>>();
    const onPressTag: TagPressHandler = (_, content) => {
        navigation.push('share-post/modal/detail', {
            nickname: content.replace('@', ''),
        });
    };

    return (
        <View style={styles.container}>
            <Avatar
                showAnimated={showAnimated}
                source={{
                    uri: user.profile.src,
                }}
                priority={'high'}
                placeholder={require('../../../../../../../assets/images/avatar.png')}
                contentFit="cover"
            />
            <View style={styles.commentItemContent}>
                <View style={styles.commentItemGap}>
                    <Text style={styles.nickname}>{user.nickname}</Text>
                    <TaggedContent uuid={comment.id} contents={comment.contents} onPressTag={onPressTag} />
                    <CommentActions comment={{ isMine: comment.isMine }} />
                </View>
                {FootChildren}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10,
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
