import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CameraAlbum } from '@/components/@common/organisms/CameraAlbum';
import { useToast } from '@/components/@common/organisms/Toast';
import ImagePickerPage from '@/pages/share-post/CreatePost/ImagePickerPage';
import { ImagePickerHeader } from '@/pages/share-post/CreatePost/ImagePickerPage/header';
import WritePostPage from '@/pages/share-post/CreatePost/WritePostPage';
import { WritePostHeader } from '@/pages/share-post/CreatePost/WritePostPage/header';
import type { PostingParamList } from '@/types/routes/param-list/sharePost';

const MAX_PHOTO_COUNT = 5;

const Stack = createNativeStackNavigator<PostingParamList>();

export default function PostingRoutes() {
    const { openToast } = useToast();

    return (
        <CameraAlbum
            maxPhotoCount={MAX_PHOTO_COUNT}
            limitCallback={() => openToast({ contents: `이미지는 최대 ${MAX_PHOTO_COUNT}개 입니다.`, severity: 'warning' })}
        >
            <Stack.Navigator>
                <Stack.Screen name="image-crop" component={ImagePickerPage} options={{ header: ImagePickerHeader }} />
                <Stack.Screen name="write" component={WritePostPage} options={{ header: WritePostHeader }} />
            </Stack.Navigator>
        </CameraAlbum>
    );
}
