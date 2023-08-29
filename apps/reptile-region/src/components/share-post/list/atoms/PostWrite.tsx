import { useNavigation } from '@react-navigation/native';
import React from 'react';

import type { BottomTabStackNavigationProp } from '<RootRoutes>';
import type { FloatingActionButtonSize } from '<SharePostComponent>';
import { PostWriteIcon } from '@/assets/icons';
import FloatingActionButton from '@/components/common/element/button/FloatingActionButton';
import { color } from '@/components/common/tokens/colors';

const PostWrite = (buttonSize: FloatingActionButtonSize) => {
    const navigation = useNavigation<BottomTabStackNavigationProp>();

    const handleRouteImageCrop = () => {
        navigation.navigate('bottom-tab-less', { screen: 'share-post/image-crop' });
    };

    return (
        <FloatingActionButton
            onPress={handleRouteImageCrop}
            Icon={PostWriteIcon}
            iconStyle={{
                ...buttonSize,
                backgroundColor: color.Teal[150].toString(),
            }}
        />
    );
};

export default PostWrite;
