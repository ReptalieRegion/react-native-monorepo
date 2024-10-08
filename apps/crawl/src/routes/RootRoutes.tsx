import { color } from '@crawl/design-system';
import messaging from '@react-native-firebase/messaging';
import { NavigationContainer, type LinkingOptions, type NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { compare } from 'compare-versions';
import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { getVersion } from 'react-native-device-info';

import SignUpRoutes from './Auth/SignUpRoutes';
import BottomTabNativeStackRoutes from './BottomTabNativeStackRoutes';
import EntityManagerCreateRoutes from './Diary/EntityManagerCreateRoutes';
import SharePostModalRoutes from './SharePost/ModalRoutes';
import PostingRoutes from './SharePost/PostingRoutes';

import useFetchRemoteConfig from '@/apis/meta-data/hooks/queries/useFetchRemoteConfig';
import { NativeStackDefaultBackHeader } from '@/components/@common/molecules';
import MandatoryUpdateRedirect from '@/components/MandatoryUpdateRedirect';
import ServiceSetupInProgress from '@/components/ServiceSetupInProgress';
import useEffectInitial from '@/hooks/useEffectInitial';
import { SignInHeader } from '@/pages/auth/SignIn/header';
import SignInPage from '@/pages/auth/SignIn/page';
import { SignUpHeader } from '@/pages/auth/SignUp/header';
import { CalendarDetailHeader } from '@/pages/diary/calendar/CalendarDetail/header';
import CalendarDetailPage from '@/pages/diary/calendar/CalendarDetail/page';
import { CalendarItemCreateHeader, CalendarItemCreatePage } from '@/pages/diary/calendar/CreateCalendar';
import { EntityManagerDetailPageHeader } from '@/pages/diary/entity-manager/DetailPage/header';
import EntityMangerDetailPage from '@/pages/diary/entity-manager/DetailPage/page';
import { EntityMangerUpdateHeader } from '@/pages/diary/entity-manager/UpdatePage/header';
import EntityMangerUpdate from '@/pages/diary/entity-manager/UpdatePage/page';
import HomePage from '@/pages/home/HomePage/page';
import { BlockUserListHeader } from '@/pages/me/BlockUserList/header';
import BlockUserListPage from '@/pages/me/BlockUserList/page';
import { LicenseContentsHeader } from '@/pages/me/License/ContentsPage/header';
import LicenseContentsPage from '@/pages/me/License/ContentsPage/page';
import { LicenseListHeader } from '@/pages/me/License/ListPage/header';
import LicenseListPage from '@/pages/me/License/ListPage/page';
import { NoticeHeader } from '@/pages/me/Notice/header';
import NoticePage from '@/pages/me/Notice/page';
import { NotificationSettingHeader } from '@/pages/me/NotificationSetting/header';
import NotificationSetting from '@/pages/me/NotificationSetting/page';
import { ProfileSettingHeader } from '@/pages/me/ProfileSetting/header';
import ProfileSetting from '@/pages/me/ProfileSetting/page';
import { PrivacyPolicyHeader } from '@/pages/me/Terms/PrivacyPolicy/header';
import PrivacyPolicyPage from '@/pages/me/Terms/PrivacyPolicy/page';
import { TermsOfUseHeader } from '@/pages/me/Terms/TermsOfUse/header';
import TermsOfUsePage from '@/pages/me/Terms/TermsOfUse/page';
import { PushLogList, PushLogListHeader } from '@/pages/notification/PushLogList';
import { SharePostUpdatePostPage, SharePostUpdatePosteHeader } from '@/pages/share-post/UpdatePost';
import { WebviewListHeader } from '@/pages/webview/header';
import WebviewPage from '@/pages/webview/page';
import type { RootRoutesParamList } from '@/types/routes/param-list';
import Notifee from '@/utils/notification/notifee';

const linking: LinkingOptions<RootRoutesParamList> = {
    prefixes: ['crawl://'],
    config: {
        screens: {
            'share-post/modal': {
                screens: {
                    'modal/post/detail': 'posts/:postId/detail/:type',
                    'modal/image-thumbnail': 'users/:nickname',
                },
            },
        },
    },
    async getInitialURL() {
        const url = await Linking.getInitialURL();

        if (url != null) {
            return url;
        }

        const deepLink = await Notifee.getDeepLink();

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
    const { data } = useFetchRemoteConfig();

    // clientFetch, refresh 실패 시 실행할 콜백함수 초기화, 자동 로그인 및 FCM Token 초기화
    useEffectInitial({ navigationRef });

    if (data?.isServiceReady === 'T') {
        return <ServiceSetupInProgress />;
    }

    if (data?.disabledVersion && compare(data.disabledVersion, getVersion(), '>')) {
        return <MandatoryUpdateRedirect />;
    }

    return (
        <NavigationContainer<RootRoutesParamList> ref={navigationRef} linking={linking}>
            <Stack.Navigator initialRouteName="bottom-tab/routes" screenOptions={{ contentStyle: styes.content }}>
                {/** 바텀 탭 시작 */}
                <Stack.Screen
                    name="bottom-tab/routes"
                    component={BottomTabNativeStackRoutes}
                    options={{
                        headerShown: false,
                    }}
                />
                {/** 바텀 탭 끝 */}

                {/** 홈 시작 */}
                <Stack.Screen name="homepage" component={HomePage} options={{ header: NativeStackDefaultBackHeader }} />
                {/** 홈 끝 */}

                {/** 인증 시작 */}
                <Stack.Screen
                    name="sign-in"
                    component={SignInPage}
                    options={{
                        header: SignInHeader,
                        animation: 'slide_from_bottom',
                        gestureEnabled: false,
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
                    component={PostingRoutes}
                    options={{ animation: 'slide_from_bottom', headerShown: false, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="share-post/post/update"
                    component={SharePostUpdatePostPage}
                    options={{ header: SharePostUpdatePosteHeader, animation: 'slide_from_bottom' }}
                />
                {/** 일상공유 끝 */}

                {/** 내 정보 시작 */}
                <Stack.Screen name="me/license" component={LicenseListPage} options={{ header: LicenseListHeader }} />
                <Stack.Screen
                    name="me/license/contents"
                    component={LicenseContentsPage}
                    options={{ header: LicenseContentsHeader }}
                />
                <Stack.Screen name="me/terms-of-use" component={TermsOfUsePage} options={{ header: TermsOfUseHeader }} />
                <Stack.Screen
                    name="me/terms-privacy-policy"
                    component={PrivacyPolicyPage}
                    options={{ header: PrivacyPolicyHeader }}
                />
                <Stack.Screen name="me/profile" component={ProfileSetting} options={{ header: ProfileSettingHeader }} />
                <Stack.Screen
                    name="me/notification-setting"
                    component={NotificationSetting}
                    options={{ header: NotificationSettingHeader }}
                />
                <Stack.Screen name="me/notification-log" component={PushLogList} options={{ header: PushLogListHeader }} />
                <Stack.Screen
                    name="me/notice"
                    component={NoticePage}
                    options={{ header: NoticeHeader, gestureEnabled: false }}
                />
                <Stack.Screen
                    name="me/block-user/list"
                    component={BlockUserListPage}
                    options={{ header: BlockUserListHeader }}
                />
                {/** 내 정보 끝 */}

                {/* 다이어리 시작 */}
                <Stack.Screen
                    name="entity-manager/create"
                    component={EntityManagerCreateRoutes}
                    options={{ headerShown: false, gestureEnabled: false, animation: 'slide_from_bottom' }}
                />
                <Stack.Screen
                    name="entity-manager/detail"
                    component={EntityMangerDetailPage}
                    options={{ header: EntityManagerDetailPageHeader }}
                />
                <Stack.Screen
                    name="entity-manager/update"
                    component={EntityMangerUpdate}
                    options={{
                        header: EntityMangerUpdateHeader,
                        presentation: 'containedTransparentModal',
                    }}
                />
                <Stack.Screen
                    name="calendar/create"
                    component={CalendarItemCreatePage}
                    options={{
                        animation: 'slide_from_bottom',
                        gestureEnabled: false,
                        header: CalendarItemCreateHeader,
                    }}
                />
                <Stack.Screen
                    name="calendar/detail"
                    component={CalendarDetailPage}
                    options={{ header: CalendarDetailHeader }}
                />
                {/* 다이어리 끝 */}

                <Stack.Screen name="webview" component={WebviewPage} options={{ header: WebviewListHeader }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styes = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
