import { useNavigation } from '@react-navigation/native';
import { color } from 'design-system';
import React from 'react';

import type { FloatingActionButtonSize } from '<SharePostComponent>';
import type { SharePostNavigationProp } from '<SharePostRoutes>';
import { PostWriteIcon } from '@/assets/icons';
import { FloatingActionButton } from '@/components/@common/atoms';

export default function PostWrite(buttonSize: FloatingActionButtonSize) {
    const navigation = useNavigation<SharePostNavigationProp<'share-post/list'>>();

    const handleRouteImageCrop = () => {
        navigation.push('share-post/modal/posting', { screen: 'image-crop' });
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
}
