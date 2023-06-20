import React from 'react';

import { RootStackParamList } from '<Routes>';

import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationOptions, createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '@/pages/HomePage/page';
import ImageCropPage from '@/pages/ImageCropPage/page';
import ImageCropRightHeader from '@/components/ui/header/ImageCropRightHeader';
import SharePostWritePage from '@/pages/SharePostWritePage/page';
import SharePostWriteRightHeader from '@/components/ui/header/SharePostWriteRightHeader';

const noHeaderOption: NativeStackNavigationOptions = { headerShown: false };

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomePage" screenOptions={{ headerBackTitleVisible: false }}>
                <Stack.Screen name="HomePage" component={HomePage} options={noHeaderOption} />
                <Stack.Screen
                    name="ImageCropPage"
                    component={ImageCropPage}
                    options={{
                        headerTintColor: 'black',
                        headerTitle: '사진 등록',
                        headerRight: ImageCropRightHeader,
                    }}
                />
                <Stack.Screen
                    name="SharePostWritePage"
                    component={SharePostWritePage}
                    options={{
                        headerBackTitleStyle: {
                            fontSize: 0,
                        },
                        headerTintColor: 'black',
                        headerTitle: '일상공유 등록',
                        headerRight: SharePostWriteRightHeader,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
