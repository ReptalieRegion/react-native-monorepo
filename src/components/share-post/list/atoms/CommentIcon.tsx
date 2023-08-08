import React, { useContext } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import { SharePostListData } from '<SharePostAPI>';
import { Comment } from '@/assets/icons';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPrompts';

type CommentIconType = Pick<SharePostListData, 'postId'>;

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
