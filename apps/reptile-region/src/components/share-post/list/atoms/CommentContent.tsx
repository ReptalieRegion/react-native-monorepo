import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import type { SharePostListData } from '<SharePostAPI>';
import { color } from '@/components/common/tokens/colors';
import { useUIPrompts } from '@/contexts/ui-prompts/UIPrompts';

type CommentContentProps = {
    post: Pick<SharePostListData['post'], 'commentCount' | 'id'>;
};

const CommentContent = ({ post }: CommentContentProps) => {
    const { id: postId, commentCount } = post;
    const { setUIPrompts } = useUIPrompts();

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

    if (commentCount === 0) {
        return null;
    }

    return (
        <View style={styles.textTouchArea}>
            <TouchableWithoutFeedback onPress={handleClickComment}>
                <Text style={styles.grayFont}>댓글 {post.commentCount}개 모두 보기</Text>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    textTouchArea: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    grayFont: {
        color: color.Gray[500].toString(),
    },
});

export default CommentContent;
