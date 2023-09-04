import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import TaggedContent from '../../../../../common/atoms/TaggedContent';
import type { TagPressHandler } from '../../../../../common/atoms/TaggedContent';

import CommentActions from './CommentActions';

import type { BottomTabStackNavigationProp } from '<RootRoutes>';
import type { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReplyAPI>';
import Avatar from '@/components/common/fast-image/Avatar';
import { color } from '@/components/common/tokens/colors';

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
    const navigation = useNavigation<BottomTabStackNavigationProp>();
    const onPressTag: TagPressHandler = (_, content) => {
        navigation.navigate('bottom-tab-less', {
            screen: 'share-post/detail',
            params: {
                nickname: content.replace('@', ''),
            },
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
                    <CommentActions />
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
