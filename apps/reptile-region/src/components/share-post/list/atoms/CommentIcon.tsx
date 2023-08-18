import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { Comment } from '../../../../assets/icons';
import { UIPromptsContext } from '../../../../contexts/ui-prompts/UIPrompts';
import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import { SharePostListData } from '<SharePostListAPI>';

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
        <TouchableWithoutFeedback onPress={handleClickComment}>
            <View style={styles.container}>
                <Comment />
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 40,
        height: 40,
    },
});

export default CommentIcon;
