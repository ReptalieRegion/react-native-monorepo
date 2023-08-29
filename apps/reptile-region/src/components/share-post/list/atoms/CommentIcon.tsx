import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import CommentBottomSheet from '../ui-prompts/bottomSheet/comment/templates/CommentBottomSheet';

import type { SharePostListData } from '<SharePostAPI>';
import { Comment } from '@/assets/icons';
import { useUIPrompts } from '@/contexts/ui-prompts/UIPrompts';

type CommentIconType = {
    post: Pick<SharePostListData['post'], 'id'>;
};

const CommentIcon = ({ post }: CommentIconType) => {
    const { setUIPrompts } = useUIPrompts();

    const handleClickComment = () => {
        const { uiPromptsOpen } = setUIPrompts({
            Component: CommentBottomSheet,
            openType: 'bottomSheet',
            props: { post },
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
