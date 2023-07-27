import React from 'react';

import { MainStackParamList } from '<Routes>';

import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@/pages/webview-example/page';
import MainRouters from './main/MainRouters';
import { SharePostImageCropPage, SharePostWritePage } from '@/pages/share-post';
import ImageCropHeader from '@/components/share-post/image-crop/atoms/header/ImageCropHeader';
import ShareHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';

const noHeaderOption: NativeStackNavigationOptions = { headerShown: false };

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<MainStackParamList>();

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="main-routers" screenOptions={{ headerBackTitleVisible: false }}>
                <Stack.Screen name="main-routers" component={MainRouters} options={noHeaderOption} />
                <Stack.Screen
                    name="share-post/image-crop"
                    component={SharePostImageCropPage}
                    options={{ header: ImageCropHeader }}
                />
                <Stack.Screen name="share-post/write" component={SharePostWritePage} options={{ header: ShareHeader }} />
                <Stack.Screen name="HomePage" component={HomePage} options={noHeaderOption} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
