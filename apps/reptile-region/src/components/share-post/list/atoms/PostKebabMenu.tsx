import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import KebabMenuBottomSheet from '../ui-prompts/bottomSheet/kebab-menu/KebabMenuBottomSheet';

import type { SharePostListData } from '<SharePostAPI>';
import { KebabMenu } from '@/assets/icons';
import { useUIPrompts } from '@/contexts/ui-prompts/UIPrompts';

type PostKebabProps = {
    user: Pick<SharePostListData['user'], 'id'>;
    post: Pick<SharePostListData['post'], 'id'>;
};

const PostKebabMenu = ({ user, post }: PostKebabProps) => {
    const { setUIPrompts } = useUIPrompts();

    const openBottomSheet = () => {
        const { uiPromptsOpen } = setUIPrompts({
            Component: KebabMenuBottomSheet,
            openType: 'bottomSheet',
            props: { user, post },
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
