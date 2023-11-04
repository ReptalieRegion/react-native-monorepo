import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { SignUpParamList } from '<routes/sign-up>';
import SignUpStep1 from '@/pages/auth/SignUp/Step1Page/page';

const Stack = createNativeStackNavigator<SignUpParamList>();

export default function SignUpRoutes() {
    return (
        <Stack.Navigator initialRouteName="step1" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="step1" component={SignUpStep1} />
        </Stack.Navigator>
    );
}