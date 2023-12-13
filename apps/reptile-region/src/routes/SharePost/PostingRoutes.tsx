import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { CameraAlbum } from '@/components/@common/organisms/CameraAlbum';
import { useToast } from '@/components/@common/organisms/Toast';
import { SharePostImagePickerHeader, SharePostImagePickerPage } from '@/pages/share-post/CreatePost/ImagePickerPage';
import { SharePostWritePostHeader, SharePostWritePostPage } from '@/pages/share-post/CreatePost/WritePostPage';
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
                <Stack.Screen
                    name="image-crop"
                    component={SharePostImagePickerPage}
                    options={{ header: SharePostImagePickerHeader }}
                />
                <Stack.Screen name="write" component={SharePostWritePostPage} options={{ header: SharePostWritePostHeader }} />
            </Stack.Navigator>
        </CameraAlbum>
    );
}
