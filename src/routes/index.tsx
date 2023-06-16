import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '@/pages/HomePage';

const RootRoutes = () => {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="HomePage"
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="HomePage" component={HomePage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
