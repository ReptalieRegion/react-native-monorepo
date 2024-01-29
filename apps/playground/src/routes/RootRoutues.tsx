import { color } from '@crawl/design-system';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';

import BottomTabRoutes from './BottomTabRoutes';

const Stack = createNativeStackNavigator();

export default function RootRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="bottom-tab" screenOptions={{ contentStyle: styles.wrapper }}>
                <Stack.Screen
                    name="bottom-tab"
                    component={BottomTabRoutes}
                    options={{
                        contentStyle: styles.wrapper,
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
