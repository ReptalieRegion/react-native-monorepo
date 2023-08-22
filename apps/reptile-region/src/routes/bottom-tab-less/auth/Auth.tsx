import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomTabLessAuthParamList } from '<BottomTabLessAuthRoutes>';
import SignInPage from '@/pages/auth/sign-in/page';
import SignUpPage from '@/pages/auth/sign-up/page';

const AuthRoutes = () => {
    const AuthStack = createNativeStackNavigator<BottomTabLessAuthParamList>();

    return (
        <AuthStack.Navigator initialRouteName="auth/sign-in">
            <AuthStack.Screen name="auth/sign-in" component={SignInPage} />
            <AuthStack.Screen name="auth/sign-up" component={SignUpPage} />
        </AuthStack.Navigator>
    );
};

export default AuthRoutes;
