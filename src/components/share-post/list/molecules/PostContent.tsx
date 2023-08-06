import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import { SharePostsData } from '<SharePostAPI>';
import AccordionMenu from '@/components/common/element/text/AccordionMenu';
import { color } from '@/components/common/tokens/colors';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPrompts';

type PostContentProps = Pick<SharePostsData, 'likeCount' | 'commentCount' | 'content' | 'postId'>;

const PostContent = ({ likeCount, commentCount, content, postId }: PostContentProps) => {
    const { setUIPrompts } = useContext(UIPromptsContext);

    const handleClickComment = () => {
        const { uiPromptsOpen } = setUIPrompts({
            Component: CommentBottomSheet,
            openType: 'bottomSheet',
            props: { postId },
        });
        uiPromptsOpen();
    };

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
                <TouchableWithoutFeedback onPress={handleClickComment}>
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
