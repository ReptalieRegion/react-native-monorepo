import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import ReplyCommentButton from './ReplyCommentButton';

import { BottomTabStackNavigationProp } from '<RootRoutes>';
import { SharePostCommentData } from '<SharePostAPI>';
import AccordionMenu from '@/components/common/element/text/AccordionMenu';
import { color } from '@/components/common/tokens/colors';
import Tag from '@/components/share-post/common/atoms/Tag';

type CommentRenderItemProps = Pick<SharePostCommentData, 'writer' | 'tags' | 'contents' | 'replyCommentCount' | 'id'>;

const CommentRenderItem = ({ writer, contents, tags, replyCommentCount, id }: CommentRenderItemProps) => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();
    return (
        <View style={styles.commentItemContainer}>
            <Image style={styles.circle} source={{ uri: writer.profile.src }} />
            <View style={styles.commentItemContent}>
                <Text style={styles.nickname}>{writer.nickname}</Text>
                <AccordionMenu numberOfLines={3}>
                    {contents.map((content, index) => {
                        const tag = tags[content];
                        const isTag = content.startsWith('@') && tag;
                        if (isTag) {
                            return (
                                <Tag
                                    key={id + index}
                                    content={content}
                                    onPress={() =>
                                        navigation.navigate('bottom-tab-less', {
                                            screen: 'bottom-tab-less/share-post/routes',
                                            params: {
                                                screen: 'share-post/detail',
                                                params: { nickname: content.replace('@', ''), userId: tag.id },
                                            },
                                        })
                                    }
                                />
                            );
                        }

                        return <Text key={id + index}>{content}</Text>;
                    })}
                </AccordionMenu>

                <View style={styles.commentActions}>
                    <Text style={styles.commentActionsText}>댓글 쓰기</Text>
                    <Text style={styles.commentActionsText}>신고</Text>
                </View>
                {replyCommentCount !== 0 && <ReplyCommentButton id={id} replyCommentCount={replyCommentCount} />}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
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

export default CommentRenderItem;
