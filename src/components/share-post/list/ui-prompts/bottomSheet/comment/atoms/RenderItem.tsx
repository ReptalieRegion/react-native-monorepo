import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import CommentActions from './CommentActions';

import { BottomTabStackNavigationProp } from '<RootRoutes>';
import { SharePostCommentData } from '<SharePostCommentAPI>';
import { SharePostCommentReplyData } from '<SharePostCommentReply>';
import AccordionMenu from '@/components/common/element/text/AccordionMenu';
import { color } from '@/components/common/tokens/colors';
import TaggedContent from '@/components/share-post/common/atoms/TaggedContent';

type RenderItemProps = {
    data:
        | Pick<SharePostCommentData, 'contents' | 'tags' | 'writer'>
        | Pick<SharePostCommentReplyData, 'contents' | 'tags' | 'writer'>;
    FootChildren?: ReactNode;
};

const RenderItem = ({ FootChildren, data: { writer, tags, contents } }: RenderItemProps) => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();

    return (
        <>
            <Image style={styles.circle} source={{ uri: writer.profile.src }} />
            <View style={styles.commentItemContent}>
                <Text style={styles.nickname}>{writer.nickname}</Text>
                <AccordionMenu numberOfLines={3}>
                    <TaggedContent
                        tags={tags}
                        contents={contents}
                        onPressTag={(_, content, tagId) => {
                            navigation.navigate('bottom-tab-less', {
                                screen: 'bottom-tab-less/share-post/routes',
                                params: {
                                    screen: 'share-post/detail',
                                    params: { nickname: content.replace('@', ''), userId: tagId },
                                },
                            });
                        }}
                    />
                </AccordionMenu>
                <CommentActions />
                {FootChildren}
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    replyCommentItemContainer: {
        gap: 10,
    },
    commentItemContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    commentItemContent: {
        flex: 1,
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

export default RenderItem;
