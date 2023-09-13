import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import type { SharePostListData } from '<SharePostAPI>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';
import { KebabMenu } from '@/assets/icons';

type PostKebabProps = {
    user: Pick<SharePostListData['user'], 'id'>;
    post: Pick<SharePostListData['post'], 'id' | 'isMine'>;
};

const PostKebabMenu = ({ user, post }: PostKebabProps) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/list'>>();

    const openBottomSheet = () => {
        navigation.navigate('share-post/bottom-sheet/kebab-menu', { post, user });
    };

    return (
        <TouchableWithoutFeedback onPress={openBottomSheet}>
            <KebabMenu />
        </TouchableWithoutFeedback>
    );
};

export default PostKebabMenu;
