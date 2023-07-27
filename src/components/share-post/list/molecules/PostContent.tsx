import { ISharePostsData } from '<SharePostAPI>';
import { color } from '@/components/common/tokens/colors';
import React, { useRef, useState } from 'react';
import { NativeSyntheticEvent, StyleSheet, Text, TextLayoutEventData, TouchableOpacity, View } from 'react-native';

type PostContentProps = Pick<ISharePostsData, 'likeCount' | 'commentCount' | 'content'>;

const PostContent = ({ likeCount, commentCount, content }: PostContentProps) => {
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
                    <TouchableOpacity activeOpacity={1} onPress={() => setIsExpanded((state) => !state)}>
                        <Text style={styles.grayFont}>{isExpanded ? '...접기' : '...더보기'}</Text>
                    </TouchableOpacity>
                )}
            </View>
            {commentCount !== 0 && <Text style={styles.grayFont}>댓글 {commentCount}개 모두 보기</Text>}
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