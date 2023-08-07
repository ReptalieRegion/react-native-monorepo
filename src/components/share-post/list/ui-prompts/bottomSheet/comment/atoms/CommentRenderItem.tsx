import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import ReplyCommentButton from './ReplyCommentButton';

import { SharePostCommentData } from '<SharePostAPI>';
import AccordionMenu from '@/components/common/element/text/AccordionMenu';
import { color } from '@/components/common/tokens/colors';

type CommentRenderItemProps = Pick<SharePostCommentData, 'writer' | 'tags' | 'contents' | 'replyCommentCount' | 'id'>;

const CommentRenderItem = ({ writer, contents, tags, replyCommentCount, id }: CommentRenderItemProps) => {
    return (
        <View style={styles.commentItemContainer}>
            <Image style={styles.circle} source={{ uri: writer.profile.src }} />
            <View style={styles.commentItemContent}>
                <Text style={styles.nickname}>{writer.nickname}</Text>
                <AccordionMenu
                    numberOfLines={3}
                    texts={contents.map((content, index) => {
                        const tag = tags[content];
                        if (content.startsWith('@') && tag) {
                            return {
                                key: tag.id + index,
                                content: content + ' ',
                                style: styles.color,
                            };
                        }
                        return {
                            key: 'content' + index,
                            content: content,
                        };
                    })}
                />

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
