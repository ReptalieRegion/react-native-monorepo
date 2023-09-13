import { NavigationProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { RootStackParamList } from '<RootRoutes>';
import type { SharePostListData } from '<SharePostAPI>';
import { KebabMenu } from '@/assets/icons';

type PostKebabProps = {
    user: Pick<SharePostListData['user'], 'id'>;
    post: Pick<SharePostListData['post'], 'id' | 'isMine'>;
};

const PostKebabMenu = ({ user, post }: PostKebabProps) => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const openBottomSheet = () => {
        navigation.navigate('bottom-tab', { screen: 'share-post/kebab-menu', params: { post, user } });
    };

    return (
        <TouchableWithoutFeedback onPress={openBottomSheet}>
            <KebabMenu />
        </TouchableWithoutFeedback>
    );
};

export default PostKebabMenu;
