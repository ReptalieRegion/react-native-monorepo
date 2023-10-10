import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { TagProvider } from 'tag-text-input';

import type { SharePostPostingParamList } from '<routes/root>';
import SharePostWriteHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';
import { SharePostWritePage } from '@/pages/share-post';
import ImagePickerPage, { ImagePickerHeader } from '@/pages/share-post/CreatePost/ImagePickerPage';

const Stack = createNativeStackNavigator<SharePostPostingParamList>();

export default function SharePostPostingRoutes() {
    return (
        <TagProvider>
            <Stack.Navigator>
                <Stack.Screen name="image-crop" component={ImagePickerPage} options={{ header: ImagePickerHeader }} />
                <Stack.Screen name="write" component={SharePostWritePage} options={{ header: SharePostWriteHeader }} />
            </Stack.Navigator>
        </TagProvider>
    );
}
