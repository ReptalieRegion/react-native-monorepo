import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import { useAuth } from '@/components/auth/organisms/Auth/hooks/useAuth';
import MyListPage from '@/pages/me/List/page';
import type { MeBottomTabParamList } from '@/types/routes/param-list/me';

const Stack = createNativeStackNavigator<MeBottomTabParamList>();

export default function MeRoutes() {
    const { isSignIn } = useAuth();
    return isSignIn ? (
        <Stack.Navigator initialRouteName="bottom-tab/list">
            <Stack.Screen name="bottom-tab/list" component={MyListPage} options={{ header: NativeStackDefaultHeader }} />
        </Stack.Navigator>
    ) : null;
}
