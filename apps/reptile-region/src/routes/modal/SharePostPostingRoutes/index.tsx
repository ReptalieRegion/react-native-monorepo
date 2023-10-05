import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TagProvider } from 'tag-text-input';

import { SharePostPostingParamList } from '<RootRoutesV2>';
import ImageCropHeader from '@/components/share-post/image-crop/atoms/header/ImageCropHeader';
import SharePostWriteHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';
import { SharePostImageCropPage, SharePostWritePage } from '@/pages/share-post';

const Stack = createNativeStackNavigator<SharePostPostingParamList>();

export default function SharePostPostingRoutes() {
    return (
        <TagProvider>
            <Stack.Navigator>
                <Stack.Screen name="image-crop" component={SharePostImageCropPage} options={{ header: ImageCropHeader }} />
                <Stack.Screen name="write" component={SharePostWritePage} options={{ header: SharePostWriteHeader }} />
            </Stack.Navigator>
        </TagProvider>
    );
}
