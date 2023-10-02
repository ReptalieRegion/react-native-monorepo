import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { color } from 'design-system';
import React from 'react';
import { TagProvider } from 'tag-text-input';

import { SharePostPostingParamList } from '<SharePostRoutes>';
import ImageCropHeader from '@/components/share-post/image-crop/atoms/header/ImageCropHeader';
import SharePostWriteHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';
import { SharePostImageCropPage, SharePostUpdatePage, SharePostWritePage } from '@/pages/share-post';

const Stack = createNativeStackNavigator<SharePostPostingParamList>();

const SharePostPostingRoutes = () => {
    return (
        <TagProvider>
            <Stack.Navigator
                initialRouteName="image-crop"
                screenOptions={{ contentStyle: { backgroundColor: color.White.toString() } }}
            >
                <Stack.Screen
                    name="image-crop"
                    component={SharePostImageCropPage}
                    options={{
                        header: ImageCropHeader,
                    }}
                />
                <Stack.Screen
                    name="write"
                    component={SharePostWritePage}
                    options={{
                        header: SharePostWriteHeader,
                    }}
                />
                <Stack.Screen
                    name="update"
                    component={SharePostUpdatePage}
                    options={{
                        header: SharePostWriteHeader,
                    }}
                />
            </Stack.Navigator>
        </TagProvider>
    );
};

export default SharePostPostingRoutes;
