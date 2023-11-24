import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, type LinkingOptions, type NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Linking } from 'react-native';

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
import { NotificationSettingHeader } from '@/pages/me/NotificationSetting/header';
import NotificationSetting from '@/pages/me/NotificationSetting/page';
import { ProfileSettingHeader } from '@/pages/me/ProfileSetting/header';
import ProfileSetting from '@/pages/me/ProfileSetting/page';
import { PrivacyPolicyHeader } from '@/pages/me/Terms/PrivacyPolicy/header';
import PrivacyPolicyPage from '@/pages/me/Terms/PrivacyPolicy/page';
import { TermsOfUseHeader } from '@/pages/me/Terms/TermsOfUse/header';
import TermsOfUsePage from '@/pages/me/Terms/TermsOfUse/page';
import PushLogList from '@/pages/notification/PushLogList';
import { pushLogListHeader } from '@/pages/notification/PushLogList/header';
import PostOptionsMenu from '@/pages/share-post/PostList/BottomSheet/PostOptionsMenu';
import { SharePostUpdateHeader } from '@/pages/share-post/UpdatePost/header';
import SharePostUpdatePage from '@/pages/share-post/UpdatePost/page';
import Notifee from '@/utils/notification/notifee';

const linking: LinkingOptions<RootRoutesParamList> = {
    prefixes: ['sharePost://'],
    config: {
        screens: {
            'share-post/modal': {
                screens: {
                    'notification/detail': 'posts/:postId/detail/:type',
                    detail: 'users/:nickname',
                },
            },
        },
    },
    async getInitialURL() {
        const url = await Linking.getInitialURL();

        if (url != null) {
            return url;
        }

        const deepLink = Notifee.getDeepLink();

        return deepLink;
    },
    subscribe(listener) {
        const onReceiveURL = ({ url }: { url: string }) => listener(url);

        const subscription = Linking.addEventListener('url', onReceiveURL);

        const unsubscribeNotification = messaging().onNotificationOpenedApp((message) => {
            const url = message.data?.link as string;

            if (url) {
                listener(url);
            }
        });

        return () => {
            subscription.remove();
            unsubscribeNotification();
        };
    },
};

type RootRoutesProps = {
    navigationRef: NavigationContainerRefWithCurrent<RootRoutesParamList>;
};

const Stack = createNativeStackNavigator<RootRoutesParamList>();

export default function RootRoutes({ navigationRef }: RootRoutesProps) {
    return (
        <NavigationContainer<RootRoutesParamList> ref={navigationRef} linking={linking}>
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
                <Stack.Screen name="share-post/modal" component={SharePostModalRoutes} options={{ headerShown: false }} />
                <Stack.Screen
                    name="share-post/modal/posting"
                    component={SharePostPostingRoutes}
                    options={{ animation: 'slide_from_bottom', headerShown: false }}
                />
                <Stack.Screen
                    name="share-post/bottom-sheet/post-options-menu"
                    component={PostOptionsMenu}
                    options={{
                        header: SignInHeader,
                        presentation: 'containedTransparentModal',
                        animation: 'none',
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="share-post/post/update"
                    component={SharePostUpdatePage}
                    options={{ header: SharePostUpdateHeader, animation: 'slide_from_bottom' }}
                />

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
                    <Stack.Screen
                        name="my/notification-setting"
                        component={NotificationSetting}
                        options={{ header: NotificationSettingHeader }}
                    />
                    <Stack.Screen name="my/notification-log" component={PushLogList} options={{ header: pushLogListHeader }} />
                </Stack.Group>
                {/** 내 정보 끝 */}
            </Stack.Navigator>
        </NavigationContainer>
    );
}
