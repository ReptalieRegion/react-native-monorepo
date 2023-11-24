import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { SharePostPostingParamList } from '<routes/root>';
import { CameraAlbum } from '@/components/@common/organisms/CameraAlbum';
import ImagePickerPage from '@/pages/share-post/CreatePost/ImagePickerPage';
import { ImagePickerHeader } from '@/pages/share-post/CreatePost/ImagePickerPage/header';
import WritePostPage from '@/pages/share-post/CreatePost/WritePostPage';
import { WritePostHeader } from '@/pages/share-post/CreatePost/WritePostPage/header';

const Stack = createNativeStackNavigator<SharePostPostingParamList>();

export default function SharePostPostingRoutes() {
    return (
        <CameraAlbum>
            <Stack.Navigator>
                <Stack.Screen name="image-crop" component={ImagePickerPage} options={{ header: ImagePickerHeader }} />
                <Stack.Screen name="write" component={WritePostPage} options={{ header: WritePostHeader }} />
            </Stack.Navigator>
        </CameraAlbum>
    );
}
