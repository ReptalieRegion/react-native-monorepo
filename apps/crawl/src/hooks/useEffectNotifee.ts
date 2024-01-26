import messaging from '@react-native-firebase/messaging';
import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import type { RootRoutesParamList } from '@/types/routes/param-list';
import Notifee from '@/utils/notification/notifee';

export default function useEffectNotifee(navigationRef: NavigationContainerRefWithCurrent<RootRoutesParamList>) {
    useEffect(() => {
        if (Platform.OS === 'android') {
            // TODO 푸시로 유입되었는지 체크 로직 추가
            Notifee.getInitialNotification();
        }

        const unMessage = messaging().onMessage(Notifee.messageReceived);
        const unSubMessaging = Notifee.foregroundEvent(navigationRef);

        return () => {
            unMessage();
            unSubMessaging();
        };
    }, [navigationRef]);
}
