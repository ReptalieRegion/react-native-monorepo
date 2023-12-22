import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import CreatePostProvider from '@/pages/share-post/CreatePost/context/Provider';
import { SharePostImagePickerHeader, SharePostImagePickerPage } from '@/pages/share-post/CreatePost/ImagePickerPage';
import { SharePostWritePostHeader, SharePostWritePostPage } from '@/pages/share-post/CreatePost/WritePostPage';
import type { PostingParamList } from '@/types/routes/param-list/sharePost';

const Stack = createNativeStackNavigator<PostingParamList>();

export default function PostingRoutes() {
    return (
        <CreatePostProvider>
            <Stack.Navigator>
                <Stack.Screen
                    name="image-crop"
                    component={SharePostImagePickerPage}
                    options={{ header: SharePostImagePickerHeader, animation: 'slide_from_bottom' }}
                />
                <Stack.Screen name="write" component={SharePostWritePostPage} options={{ header: SharePostWritePostHeader }} />
            </Stack.Navigator>
        </CreatePostProvider>
    );
}
