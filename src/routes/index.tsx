import React from 'react';

import { RootStackParamList } from '<Routes>';

import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@/pages/HomePage/page';
import ImageCropPage from '@/pages/ImageCropPage/page';
import SharePostWritePage from '@/pages/SharePostWritePage/page';

const noHeaderOption: NativeStackNavigationOptions = { headerShown: false };

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerBackTitleVisible: false }}>
                <Stack.Screen name="HomePage" component={HomePage} options={noHeaderOption} />
                <Stack.Screen name="ImageCropPage" component={ImageCropPage} options={noHeaderOption} />
                <Stack.Screen name="SharePostWritePage" component={SharePostWritePage} options={noHeaderOption} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
