import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabLessSharePostParamList } from '<BottomTabLessSharePostRoutes>';
import SharePostDetailHeader from '../../../components/share-post/detail/atoms/header/DetailHeader';
import ImageCropHeader from '../../../components/share-post/image-crop/atoms/header/ImageCropHeader';
import ShareHeader from '../../../components/share-post/write/atoms/header/SharePostWriteHeader';
import { SharePostDetailPage, SharePostWritePage, SharePostImageCropPage } from '../../../pages/share-post';

const SharePostRoutes = () => {
    const SharePostStack = createNativeStackNavigator<BottomTabLessSharePostParamList>();

    return (
        <SharePostStack.Navigator initialRouteName="share-post/image-crop">
            <SharePostStack.Screen
                name="share-post/detail"
                component={SharePostDetailPage}
                options={{ header: SharePostDetailHeader }}
            />
            <SharePostStack.Screen
                name="share-post/image-crop"
                component={SharePostImageCropPage}
                options={{ header: ImageCropHeader }}
            />
            <SharePostStack.Screen name="share-post/write" component={SharePostWritePage} options={{ header: ShareHeader }} />
        </SharePostStack.Navigator>
    );
};

export default SharePostRoutes;
