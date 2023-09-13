import { useNavigation } from '@react-navigation/native';
import React from 'react';

import type { FloatingActionButtonSize } from '<SharePostComponent>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';
import { PostWriteIcon } from '@/assets/icons';
import FloatingActionButton from '@/components/common/element/button/FloatingActionButton';
import { color } from '@/components/common/tokens/colors';

const PostWrite = (buttonSize: FloatingActionButtonSize) => {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/modal/write'>>();

    const handleRouteImageCrop = () => {
        navigation.push('share-post/modal/image-crop');
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
