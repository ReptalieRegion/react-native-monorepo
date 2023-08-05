import React from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { SharePostsData } from '<SharePostAPI>';
import AccordionMenu from '@/components/common/element/text/AccordionMenu';
import { color } from '@/components/common/tokens/colors';

type PostContentProps = Pick<SharePostsData, 'likeCount' | 'commentCount' | 'content' | 'postId'>;

const PostContent = ({ likeCount, commentCount, content, postId }: PostContentProps) => {
    return (
        <View style={styles.container}>
            {likeCount !== 0 && <Text style={[styles.fontBold]}>{likeCount}명이 좋아합니다.</Text>}
            <AccordionMenu
                numberOfLines={2}
                texts={[
                    {
                        key: postId,
                        content,
                        style: styles.content,
                    },
                ]}
            />
            {commentCount !== 0 && (
                <TouchableWithoutFeedback>
                    <View>
                        <Text style={styles.grayFont}>댓글 {commentCount}개 모두 보기</Text>
                    </View>
                </TouchableWithoutFeedback>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        gap: 5,
    },
    content: {
        overflow: 'hidden',
    },
    fontBold: {
        fontWeight: 'bold',
    },
    grayFont: {
        color: color.Gray[500].toString(),
    },
});

export default PostContent;
