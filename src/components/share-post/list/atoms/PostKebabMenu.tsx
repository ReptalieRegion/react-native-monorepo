import React, { useContext } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';
import KebabMenu from '@/assets/icons/KebabMenu';
import { UIPromptsContext } from '@/contexts/ui-prompts/UIPromptsContext';
import KebabMenuBottomSheet from '../ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';
import { SharePostsData } from '<SharePostAPI>';

type PostKebabProps = Pick<SharePostsData, 'postId' | 'userId'>;

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
