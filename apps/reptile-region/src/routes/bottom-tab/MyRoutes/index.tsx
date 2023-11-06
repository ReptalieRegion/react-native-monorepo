import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { MyTabParamList } from '<routes/bottom-tab>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import MyListPage from '@/pages/me/List/page';

const Stack = createNativeStackNavigator<MyTabParamList>();

export default function MyRoutes() {
    const { isSignIn } = useAuth();
    return isSignIn ? (
        <Stack.Navigator initialRouteName="my/list">
            <Stack.Screen name="my/list" component={MyListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    ) : null;
}
