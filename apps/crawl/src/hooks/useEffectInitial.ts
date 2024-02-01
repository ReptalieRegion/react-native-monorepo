import { useErrorBoundaryGroup } from '@crawl/error-boundary';
import messaging from '@react-native-firebase/messaging';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import Config from 'react-native-config';

import { useAuth, useAuthHandler } from './auth';

import { initRefreshFailCallback } from '@/apis/@utils/fetcher';
import useUpdateFCMToken from '@/apis/me/profile/hooks/mutations/useUpdateFCMToken';
import useUpdatePushAgree from '@/apis/notification/push/hooks/mutations/useBaseUpdatePushAgree';
import { PushAgreeType } from '@/types/apis/notification';
import type { RootRoutesParamList } from '@/types/routes/param-list';

type RootRoutesProps = {
    navigationRef: NavigationContainerRefWithCurrent<RootRoutesParamList>;
};

type UseEffectInitialProps = RootRoutesProps;

export default function useEffectInitial({ navigationRef }: UseEffectInitialProps) {
    const { reset } = useErrorBoundaryGroup();
    const { isSignIn, isLoading } = useAuth();
    const { mutate: updateFCMTokenMutate } = useUpdateFCMToken();
    const { mutate: updatePushAgreeMutate } = useUpdatePushAgree();
    const { signOut } = useAuthHandler();

    /**
     * 로그인 시 ErrorBoundary reset
     */
    useEffect(() => {
        if (isSignIn) {
            reset();
        }
    }, [isSignIn, reset]);

    /**
     * clientFetch에서 refresh 실패했을 때 실행할 로직 초기화
     */
    useEffect(() => {
        initRefreshFailCallback(() => {
            navigationRef.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'home/routes',
                    params: {
                        screen: 'bottom-tab/list',
                    },
                },
            });
            signOut();
        });
    }, [navigationRef, signOut]);

    /**
     * 자동로그인 성공 시 FCM Token Update, 푸시 알림 허용 여부 체크
     */
    useEffect(() => {
        if (!isLoading && isSignIn) {
            messaging()
                .requestPermission()
                .then(async (setting) => {
                    const hasPermission =
                        setting === messaging.AuthorizationStatus.AUTHORIZED ||
                        setting === messaging.AuthorizationStatus.PROVISIONAL;

                    if (hasPermission) {
                        const fcmToken = await messaging().getToken();
                        updateFCMTokenMutate({ fcmToken });
                    }
                    updatePushAgreeMutate({ type: PushAgreeType.Device, isAgree: hasPermission });
                });
        }
    }, [isLoading, isSignIn, updateFCMTokenMutate, updatePushAgreeMutate]);

    /**
     * 로그인 체크 완료 시, 스플레쉬 닫기
     */
    useEffect(() => {
        const id = setTimeout(() => {
            BootSplash.hide({ fade: true });
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    }, [isLoading]);

    useEffect(() => {
        if (Platform.OS === 'android') {
            GoogleSignin.configure({
                webClientId: Config.ANDROID_GOOGLE_WEB_CLIENT_ID,
            });
        }
    }, []);
}
