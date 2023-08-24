import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import { SharePostListData } from '<SharePostListAPI>';
import AccordionMenu from '@/components/common/element/text/AccordionMenu';
import { color } from '@/components/common/tokens/colors';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPrompts';

type PostContentProps = {
    post: Pick<SharePostListData['post'], 'likeCount' | 'commentCount' | 'contents' | 'id'>;
};

const PostContent = ({ post }: PostContentProps) => {
    const { id: postId, commentCount, contents, likeCount } = post;
    const { setUIPrompts } = useContext(UIPromptsContext);

    const handleClickComment = () => {
        const { uiPromptsOpen } = setUIPrompts({
            Component: CommentBottomSheet,
            openType: 'bottomSheet',
            props: {
                post: {
                    id: postId,
                },
            },
        });
        uiPromptsOpen();
    };

    return (
        <View style={styles.container}>
            {likeCount !== 0 && <Text style={[styles.fontBold]}>{likeCount}명이 좋아합니다.</Text>}
            <AccordionMenu numberOfLines={2}>
                <Text key={postId} style={styles.content}>
                    {contents}
                </Text>
            </AccordionMenu>
            {commentCount !== 0 && (
                <View style={styles.textTouchArea}>
                    <TouchableWithoutFeedback onPress={handleClickComment}>
                        <Text style={styles.grayFont}>댓글 {post.commentCount}개 모두 보기</Text>
                    </TouchableWithoutFeedback>
                </View>
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
    textTouchArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    grayFont: {
        color: color.Gray[500].toString(),
    },
});

export default PostContent;
