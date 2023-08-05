import React, { useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import { SharePostsData } from '<SharePostAPI>';
import Comment from '@/assets/icons/Comment';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPromptsContext';

type CommentIconType = Pick<SharePostsData, 'postId'>;

const CommentIcon = ({ postId }: CommentIconType) => {
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
            <TouchableWithoutFeedback onPress={handleClickComment}>
                <View>
                    <Comment />
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    },
});

export default CommentIcon;
