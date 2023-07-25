import React from 'react';

import { RootStackParamList } from '<Routes>';

import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@/pages/webview-example/page';
import MainRouters from './main/MainRouters';
import { SharePostImageCropPage, SharePostWritePage } from '@/pages/share-post';

const noHeaderOption: NativeStackNavigationOptions = { headerShown: false };

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="main-routers" screenOptions={{ headerBackTitleVisible: false }}>
                <Stack.Screen name="main-routers" component={MainRouters} options={noHeaderOption} />
                <Stack.Screen name="share-post/image-crop" component={SharePostImageCropPage} options={noHeaderOption} />
                <Stack.Screen name="share-post/write" component={SharePostWritePage} options={noHeaderOption} />
                <Stack.Screen name="HomePage" component={HomePage} options={noHeaderOption} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
