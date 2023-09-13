import { useFlipper } from '@react-navigation/devtools';
import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabRoutes from './bottom-tab';

import type { RootStackParamList } from '<RootRoutes>';
import AuthSignInHeader from '@/components/auth/sign-in/header';
import SharePostDetailHeader from '@/components/share-post/detail/atoms/header/DetailHeader';
import ImageCropHeader from '@/components/share-post/image-crop/atoms/header/ImageCropHeader';
import SharePostWriteHeader from '@/components/share-post/write/atoms/header/SharePostWriteHeader';
import SignInPage from '@/pages/auth/sign-in/page';
import SignUpPage from '@/pages/auth/sign-up/page';
import { SharePostDetailPage, SharePostImageCropPage, SharePostWritePage } from '@/pages/share-post';

const RootRoutes = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();
    const navigationRef = useNavigationContainerRef();
    useFlipper(navigationRef);

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName="bottom-tab">
                <Stack.Screen name="bottom-tab" component={BottomTabRoutes} options={{ headerShown: false }} />

                {/** Bottom Tab 없는 페이지 */}
                <Stack.Group navigationKey="bottom-tab-less">
                    <Stack.Screen
                        name="share-post/detail"
                        component={SharePostDetailPage}
                        options={{ header: SharePostDetailHeader }}
                    />
                    <Stack.Screen
                        name="share-post/image-crop"
                        component={SharePostImageCropPage}
                        options={{ header: ImageCropHeader }}
                    />
                    <Stack.Screen
                        name="share-post/write"
                        component={SharePostWritePage}
                        options={{ header: SharePostWriteHeader }}
                    />
                </Stack.Group>

                {/** Bottom Tab 없고 밑에서 위로 올라오는 페이지 */}
                <Stack.Group>
                    <Stack.Screen name="auth/sign-in" component={SignInPage} options={{ header: AuthSignInHeader }} />
                    <Stack.Screen name="auth/sign-up" component={SignUpPage} />
                </Stack.Group>
            </Stack.Navigator>
        </NavigationContainer>
    );
};
export default RootRoutes;
