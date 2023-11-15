import messaging from '@react-native-firebase/messaging';
import { useCallback } from 'react';

import { useUpdateFCMToken } from '@/apis/me/profile/hooks';
const useFCM = () => {
    const { mutate } = useUpdateFCMToken();

    const initializeFCM = useCallback(async () => {
        try {
            const setting = await messaging().requestPermission();
            if (setting === messaging.AuthorizationStatus.AUTHORIZED || setting === messaging.AuthorizationStatus.PROVISIONAL) {
                const fcmToken = await messaging().getToken();
                console.log(fcmToken);
                mutate({ fcmToken });
            }
        } catch (error) {
            console.log(error);
        }
    }, [mutate]);

    return {
        initializeFCM,
    };
};

export default useFCM;
