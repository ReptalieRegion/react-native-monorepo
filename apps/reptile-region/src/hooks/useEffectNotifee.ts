import messaging from '@react-native-firebase/messaging';
import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import type { RootRoutesParamList } from '<routes/root>';
import Notifee from '@/utils/notification/notifee';

const useEffectNotifee = (navigationRef: NavigationContainerRefWithCurrent<RootRoutesParamList>) => {
    useEffect(() => {
        if (Platform.OS === 'android') {
            Notifee.getInitialNotification();
        }

        const unSubOpened = messaging().onNotificationOpenedApp((message) => {
            console.log('===onNotificationOpenedApp===');
            console.log(message);
            console.log('===onNotificationOpenedApp===');
        });
        const unMessage = messaging().onMessage(Notifee.messageReceived);
        const unSubMessaging = Notifee.foregroundEvent(navigationRef);

        return () => {
            unSubOpened();
            unMessage();
            unSubMessaging();
        };
    }, [navigationRef]);
};

export default useEffectNotifee;
