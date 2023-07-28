import React from 'react';
import KebabMenu from '@/assets/icons/KebabMenu';
import { TouchableWithoutFeedback } from 'react-native';

const PostKebabMenu = () => {
    const openBottomSheet = () => {
        return;
    };

    return (
        <TouchableWithoutFeedback onPress={openBottomSheet}>
            <KebabMenu />
        </TouchableWithoutFeedback>
    );
};

export default PostKebabMenu;
