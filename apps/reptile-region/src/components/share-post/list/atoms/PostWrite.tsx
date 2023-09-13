import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';

import { RootStackParamList } from '<RootRoutes>';
import type { FloatingActionButtonSize } from '<SharePostComponent>';
import { PostWriteIcon } from '@/assets/icons';
import FloatingActionButton from '@/components/common/element/button/FloatingActionButton';
import { color } from '@/components/common/tokens/colors';

const PostWrite = (buttonSize: FloatingActionButtonSize) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'share-post/write'>>();

    const handleRouteImageCrop = () => {
        navigation.navigate('share-post/image-crop');
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
