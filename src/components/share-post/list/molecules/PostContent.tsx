import { SharePostListNavigationProp } from '<Routes>';
import { SharePostsData } from '<SharePostAPI>';
import { color } from '@/components/common/tokens/colors';
import { useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextLayoutEventData, TouchableWithoutFeedback, View } from 'react-native';

type PostContentProps = Pick<SharePostsData, 'likeCount' | 'commentCount' | 'content' | 'postId'>;

const PostContent = ({ likeCount, commentCount, content, postId }: PostContentProps) => {
    const navigation = useNavigation<SharePostListNavigationProp>();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOverTwoLines, setIsOverTwoLines] = useState(false);
    const ref = useRef<Text>(null);

    const onTextLayout = (event: NativeSyntheticEvent<TextLayoutEventData>) => {
        setIsOverTwoLines(event.nativeEvent.lines.length >= 2);
    };

    return (
        <View style={styles.container}>
            {likeCount !== 0 && <Text style={[styles.fontBold]}>{likeCount}명이 좋아합니다.</Text>}
            <View>
                <Text ref={ref} style={styles.content} numberOfLines={isExpanded ? undefined : 2} onTextLayout={onTextLayout}>
                    {content}
                </Text>
                {isOverTwoLines && (
                    <TouchableWithoutFeedback onPress={() => setIsExpanded((state) => !state)}>
                        <View>
                            <Text style={styles.grayFont}>{isExpanded ? '...접기' : '...더보기'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
            {commentCount !== 0 && (
                <TouchableWithoutFeedback onPress={() => navigation.push('share-post/comment', { postId })}>
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
