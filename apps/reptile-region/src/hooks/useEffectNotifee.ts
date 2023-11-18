import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import { Notifee } from '@/utils/notification/notifee';

const useEffectNotifee = () => {
    useEffect(() => {
        const notifee = new Notifee();
        if (Platform.OS === 'android') {
            notifee.notifeeGetInitialNotification();
        }

        const unMessage = messaging().onMessage(notifee.notifeeForegroundMessageReceived);
        const unSubMessaging = notifee.notifeeForegroundEvent();

        return () => {
            unMessage();
            unSubMessaging();
        };
    }, []);
};

export default useEffectNotifee;
