import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import AccordionMenu from '../../../../../../common/element/text/AccordionMenu';
import Avatar from '../../../../../../common/fast-image/Avatar';
import { color } from '../../../../../../common/tokens/colors';
import TaggedContent from '../../../../../common/atoms/TaggedContent';
import type { TagPressHandler } from '../../../../../common/atoms/TaggedContent';

import CommentActions from './CommentActions';

import { BottomTabStackNavigationProp } from '<RootRoutes>';
import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';

type RenderItemProps = {
    data:
        | Pick<SharePostCommentData, 'contents' | 'tags' | 'writer'>
        | Pick<SharePostCommentReplyData, 'contents' | 'tags' | 'writer'>;
    FootChildren?: ReactNode;
} & { showAnimated?: boolean };

const CommentBaseRenderItem = ({ FootChildren, showAnimated, data: { writer, tags, contents } }: RenderItemProps) => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();
    const onPressTag: TagPressHandler = (_, content, tagId) => {
        navigation.navigate('bottom-tab-less', {
            screen: 'bottom-tab-less/share-post/routes',
            params: {
                screen: 'share-post/detail',
                params: { nickname: content.replace('@', ''), userId: tagId },
            },
        });
    };

    return (
        <View style={styles.container}>
            <Avatar
                showAnimated={showAnimated}
                source={{
                    uri: writer.profile.src,
                    priority: FastImage.priority.high,
                    cache: FastImage.cacheControl.web,
                }}
                defaultSource={require('../../../../../../../assets/images/avatar.png')}
                resizeMode={FastImage.resizeMode.cover}
                fallback
            />
            <View style={styles.commentItemContent}>
                <View style={styles.commentItemGap}>
                    <Text style={styles.nickname}>{writer.nickname}</Text>
                    <AccordionMenu numberOfLines={3}>
                        <TaggedContent tags={tags} contents={contents} onPressTag={onPressTag} />
                    </AccordionMenu>
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
