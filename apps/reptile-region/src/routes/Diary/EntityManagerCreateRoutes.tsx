import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import EntityManagerBirthdayPage from '@/pages/diary/entity-manager/create/BirthdayPage/page';
import EntityManagerGenderPage from '@/pages/diary/entity-manager/create/GenderPage/page';
import EntityManagerImagePage from '@/pages/diary/entity-manager/create/ImagePage/page';
import type { EntityManagerCreateParamList } from '@/types/routes/param-list/diary';

const Stack = createNativeStackNavigator<EntityManagerCreateParamList>();

export default function EntityManagerCreateRoutes() {
    return (
        <Stack.Navigator initialRouteName="image" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="image" component={EntityManagerImagePage} />
            <Stack.Screen name="gender" component={EntityManagerGenderPage} />
            <Stack.Screen name="birthday" component={EntityManagerBirthdayPage} />
        </Stack.Navigator>
    );
}
