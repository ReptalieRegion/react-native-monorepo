import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { color } from 'design-system';
import React from 'react';

import { RootRoutesParamList } from '<RootRoutesV2>';
import { SharePostTabParamList } from '<routes/bottom-tab>';
import type { FloatingActionButtonSize } from '<SharePostComponent>';
import { PostWriteIcon } from '@/assets/icons';
import { FloatingActionButton } from '@/components/@common/atoms';

type PostWriteNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<SharePostTabParamList, 'share-post/list'>,
    NativeStackNavigationProp<RootRoutesParamList>
>;

export default function PostWrite(buttonSize: FloatingActionButtonSize) {
    const navigation = useNavigation<PostWriteNavigationProp>();

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
