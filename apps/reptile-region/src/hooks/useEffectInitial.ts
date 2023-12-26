import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';

import { useAuth } from './auth';

import useUpdateFCMToken from '@/apis/me/profile/hooks/mutations/useUpdateFCMToken';

export default function useEffectInitial() {
    const { isSignIn, isLoading } = useAuth();
    const { mutate } = useUpdateFCMToken();

    /**
     * 앱 시작 후, 자동로그인 성공 시 FCM Token Update
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
                        mutate({ fcmToken });
                    }
                });
        }
    }, [isLoading, isSignIn, mutate]);
}
