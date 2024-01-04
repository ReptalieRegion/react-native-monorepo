import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabRoutes from './BottomTab';
import CommentRoutes from './SharePost/CommentRoutes';

import type { BottomTabNativeStackParamList } from '@/types/routes/param-list/bottom-tab';

const Stack = createNativeStackNavigator<BottomTabNativeStackParamList>();

export default function BottomTabNativeStackRoutes() {
    return (
        <Stack.Navigator initialRouteName="tab" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="tab" component={BottomTabRoutes} />
            <Stack.Screen
                name="bottom-tab/modal/comment"
                component={CommentRoutes}
                options={{
                    presentation: 'containedTransparentModal',
                    animation: 'none',
                }}
            />
        </Stack.Navigator>
    );
}
