import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import SignUpStep1 from '@/pages/auth/SignUp/Step1Page/page';
import type { SignUpParamList } from '@/types/routes/param-list/auth';

const Stack = createNativeStackNavigator<SignUpParamList>();

export default function SignUpRoutes() {
    return (
        <Stack.Navigator initialRouteName="step1" screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <Stack.Screen name="step1" component={SignUpStep1} />
        </Stack.Navigator>
    );
}
