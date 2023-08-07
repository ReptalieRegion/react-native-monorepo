import React, { useContext } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import KebabMenuBottomSheet from '../ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';

import { SharePostListData } from '<SharePostAPI>';
import KebabMenu from '@/assets/icons/KebabMenu';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPrompts';

type PostKebabProps = Pick<SharePostListData, 'postId' | 'userId'>;

const PostKebabMenu = (postInfo: PostKebabProps) => {
    const { setUIPrompts } = useContext(UIPromptsContext);

    const openBottomSheet = () => {
        const { uiPromptsOpen } = setUIPrompts({
            Component: KebabMenuBottomSheet,
            openType: 'bottomSheet',
            props: { postInfo },
        });
        uiPromptsOpen();
    };

    return (
        <TouchableWithoutFeedback onPress={openBottomSheet}>
            <View>
                <KebabMenu />
            </View>
        </TouchableWithoutFeedback>
    );
};

export default PostKebabMenu;
