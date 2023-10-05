import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentRoutes from './bottom-sheet/SharePostCommentRoutes';
import BottomTabRoutes from './bottom-tab';

import { BottomTabNativeStackParamList } from '<routes/bottom-tab>';
import PostOptionsMenu from '@/pages/share-post/BottomSheet/PostOptionsMenu';

const Stack = createNativeStackNavigator<BottomTabNativeStackParamList>();

export default function BottomTabNativeStackRoutes() {
    return (
        <Stack.Navigator initialRouteName="tab" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tab" component={BottomTabRoutes} />
            <Stack.Group
                screenOptions={{
                    presentation: 'containedTransparentModal',
                    animation: 'none',
                }}
            >
                <Stack.Screen name="bottom-sheet/comment" component={SharePostCommentRoutes} />
                <Stack.Screen name="bottom-sheet/post-options-menu" component={PostOptionsMenu} />
            </Stack.Group>
        </Stack.Navigator>
    );
}
