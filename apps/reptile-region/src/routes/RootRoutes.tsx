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
import { LicenseContentsHeader } from '@/pages/me/License/ContentsPage/header';
import LicenseContentsPage from '@/pages/me/License/ContentsPage/page';
import { LicenseListHeader } from '@/pages/me/License/ListPage/header';
import LicenseListPage from '@/pages/me/License/ListPage/page';
import { ProfileSettingHeader } from '@/pages/me/ProfileSetting/header';
import ProfileSetting from '@/pages/me/ProfileSetting/page';
import { PrivacyPolicyHeader } from '@/pages/me/Terms/PrivacyPolicy/header';
import PrivacyPolicyPage from '@/pages/me/Terms/PrivacyPolicy/page';
import { TermsOfUseHeader } from '@/pages/me/Terms/TermsOfUse/header';
import TermsOfUsePage from '@/pages/me/Terms/TermsOfUse/page';
import PostOptionsMenu from '@/pages/share-post/BottomSheet/PostOptionsMenu';
import SharePostUpdatePage, { SharePostUpdateHeader } from '@/pages/share-post/UpdatePost';

const Stack = createNativeStackNavigator<RootRoutesParamList>();

const RootRoutes = () => {
    const navigationRef = useNavigationContainerRef();

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
                    <Stack.Screen
                        name="share-post/post/update"
                        component={SharePostUpdatePage}
                        options={{ header: SharePostUpdateHeader, animation: 'slide_from_bottom' }}
                    />
                </Stack.Group>
                {/** 내 정보 시작 */}
                <Stack.Group>
                    <Stack.Screen name="my/license" component={LicenseListPage} options={{ header: LicenseListHeader }} />
                    <Stack.Screen
                        name="my/license/contents"
                        component={LicenseContentsPage}
                        options={{ header: LicenseContentsHeader }}
                    />
                    <Stack.Screen name="my/terms-of-use" component={TermsOfUsePage} options={{ header: TermsOfUseHeader }} />
                    <Stack.Screen
                        name="my/terms-privacy-policy"
                        component={PrivacyPolicyPage}
                        options={{ header: PrivacyPolicyHeader }}
                    />
                    <Stack.Screen name="my/profile" component={ProfileSetting} options={{ header: ProfileSettingHeader }} />
                </Stack.Group>
                {/** 내 정보 끝 */}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default RootRoutes;
