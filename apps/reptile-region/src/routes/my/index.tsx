import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import type { MyParamList } from '<MyRoutes>';
import { NativeStackDefaultHeader } from '@/components/@common/molecules';
import SignInHeader from '@/components/auth/sign-in/header';
import SignInPage from '@/pages/auth/sign-in/page';
import SignUpPage from '@/pages/auth/sign-up/page';
import MyListPage from '@/pages/my/list/page';

const MyStack = createNativeStackNavigator<MyParamList>();

const MyRoutes = () => {
    return (
        <MyStack.Navigator initialRouteName="my/list">
            <MyStack.Screen name="my/list" component={MyListPage} options={{ header: NativeStackDefaultHeader }} />
            <MyStack.Screen name="auth/sign-in" component={SignInPage} options={{ header: SignInHeader }} />
            <MyStack.Screen name="auth/sign-up" component={SignUpPage} options={{ header: NativeStackDefaultHeader }} />
        </MyStack.Navigator>
    );
};

export default MyRoutes;
