import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SharePostCommentRoutes from './bottom-sheet/SharePostCommentRoutes';
import BottomTabRoutes from './bottom-tab';

import { BottomTabNativeStackParamList } from '<routes/bottom-tab>';

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
            </Stack.Group>
        </Stack.Navigator>
    );
}
