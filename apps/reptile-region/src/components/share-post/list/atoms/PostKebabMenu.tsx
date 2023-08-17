import React, { useContext } from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import KebabMenuBottomSheet from '../ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';

import { SharePostListData } from '<SharePostListAPI>';
import { KebabMenu } from '../../../../assets/icons';
import { UIPromptsContext } from '../../../../contexts/ui-prompts/UIPrompts';

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
            <KebabMenu />
        </TouchableWithoutFeedback>
    );
};

export default PostKebabMenu;
