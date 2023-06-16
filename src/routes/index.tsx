import React from 'react';

import { RootStackParamList } from '<Routes>';

import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@/pages/HomePage';
import ImageCropPage from '@/pages/ImageCropPage';

const noHeaderOption: NativeStackNavigationOptions = { headerShown: false };

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage">
                <Stack.Screen name="HomePage" component={HomePage} options={noHeaderOption} />
                <Stack.Screen name="ImageCropPage" component={ImageCropPage} options={{ headerTitle: '새 게시물' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
