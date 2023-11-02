import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNativeStackRoutes from './BottomTabNativeStackRoutes';
import SharePostModalRoutes from './modal/SharePostModalRoutes';
import SharePostPostingRoutes from './modal/SharePostPostingRoutes';
import SignUpRoutes from './SignUpRoutes';

import type { RootRoutesParamList } from '<routes/root>';
import { SignInHeader } from '@/pages/auth/SignIn/header';
import SignInPage from '@/pages/auth/SignIn/page';
import { SignUpHeader } from '@/pages/auth/SignUp/header';
import PostOptionsMenu from '@/pages/share-post/BottomSheet/PostOptionsMenu';
import SharePostUpdatePage, { SharePostUpdateHeader } from '@/pages/share-post/UpdatePost';

const Stack = createNativeStackNavigator<RootRoutesParamList>();

const RootRoutes = () => {
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

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
                    component={SignUpRoutes}
                    options={{
                        header: SignUpHeader,
                    }}
                />
                {/** 인증 끝 */}

                {/** 일상공유 시작 */}
                <Stack.Group screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="share-post/modal" component={SharePostModalRoutes} />
                    <Stack.Screen
                        name="share-post/modal/posting"
                        component={SharePostPostingRoutes}
                        options={{ animation: 'slide_from_bottom' }}
                    />
                    <Stack.Screen
                        name="share-post/bottom-sheet/post-options-menu"
                        component={PostOptionsMenu}
                        options={{
                            header: SignInHeader,
                            presentation: 'containedTransparentModal',
                            animation: 'none',
                        }}
                    />
                </Stack.Group>
                <Stack.Screen
                    name="share-post/post/update"
                    component={SharePostUpdatePage}
                    options={{ header: SharePostUpdateHeader, animation: 'slide_from_bottom' }}
                />
                {/** 일상공유 끝 */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
