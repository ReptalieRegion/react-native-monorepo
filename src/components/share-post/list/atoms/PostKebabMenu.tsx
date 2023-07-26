import React from 'react';
import { TouchableOpacity } from 'react-native';
import KebabMenu from '@/assets/icons/KebabMenu';

const PostKebabMenu = () => {
    const openBottomSheet = () => {
        return;
    };

    return (
        <TouchableOpacity onPress={openBottomSheet} activeOpacity={1}>
            <KebabMenu />
        </TouchableOpacity>
    );
};

export default PostKebabMenu;
