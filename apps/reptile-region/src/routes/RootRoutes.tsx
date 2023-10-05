import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';

import BottomTabNativeStackRoutes from './BottomTabNativeStackRoutes';
import SharePostModalRoutes from './modal/SharePostModalRoutes';
import SharePostPostingRoutes from './modal/SharePostPostingRoutes';

import { RootRoutesParamList } from '<RootRoutesV2>';
import { useSignIn } from '@/apis/auth';
import SignInHeader from '@/components/auth/sign-in/header';
import SignInPage from '@/pages/auth/sign-in/page';
import SignUpPage from '@/pages/auth/sign-up/page';

const Stack = createNativeStackNavigator<RootRoutesParamList>();

const RootRoutes = () => {
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    const { mutate } = useSignIn();

    useEffect(() => {
        mutate({ userId: '3de3fm3cw3fl3i4.3d73ft3hk@gmail.com', password: '123123' });
    }, [mutate]);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="bottom-tab/routes">
                {/** 바텀 탭 시작 */}
                <Stack.Screen
                    name="bottom-tab/routes"
                    component={BottomTabNativeStackRoutes}
                    options={{
                        headerShown: false,
                    }}
                />
                {/** 바텀 탭 끝 */}

                {/** 인증 시작 */}
                <Stack.Group navigationKey="auth">
                    <Stack.Screen
                        name="sign-in"
                        component={SignInPage}
                        options={{
                            header: SignInHeader,
                            animation: 'slide_from_bottom',
                        }}
                    />
                    <Stack.Screen
                        name="sign-up"
                        component={SignUpPage}
                        options={{
                            header: SignInHeader,
                        }}
                    />
                </Stack.Group>
                {/** 인증 끝 */}

                {/** 일상공유 시작 */}
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="share-post/modal" component={SharePostModalRoutes} />
                    <Stack.Screen
                        name="share-post/modal/posting"
                        component={SharePostPostingRoutes}
                        options={{ animation: 'slide_from_bottom' }}
                    />
                </Stack.Group>
                {/** 일상공유 끝 */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
