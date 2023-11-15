import notifee, { EventType, type NotificationIOS } from '@notifee/react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';

import { createNotificationPushLog } from '@/apis/notification/log/repository';

type NotifeeOptions = {
    ios: NotificationIOS;
};

export const notifeeAndroidGetInitialNotification = async () => {
    return notifee.getInitialNotification().then((result) => {
        console.log('=======init=======\n', result);
    });
};

export const notifeeForegroundMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    console.log('=======front=======\n', message);
    const notifeeOptions = message.data?.notifee_options;
    if (notifeeOptions) {
        const ios = (notifeeOptions as NotifeeOptions).ios;
        console.log(ios);
        notifee.displayNotification({
            title: message.notification?.title,
            body: message.notification?.body,
            ios,
        });
    }
};

export const notifeeForegroundEvent = () => {
    return notifee.onForegroundEvent(({ type, detail }) => {
        switch (type) {
            case EventType.DISMISSED:
                console.log('User dismissed notification', detail.notification);
                break;
            case EventType.PRESS:
                console.log('User pressed notification', detail.notification);
                break;
        }
    });
};

export const notifeeBackgroundMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    createNotificationPushLog()
        .then(() => {
            console.log('success', message);
        })
        .catch((error) => {
            console.log('error', error);
        });
};

export const notifeeBackgroundEvent = () => {
    return notifee.onBackgroundEvent(async (notification) => {
        console.log('=======onBackgroundEvent=======\n', notification);
    });
};

export const notifeeGetInitialNotification = async () => {
    const initialNotification = await notifee.getInitialNotification();
    console.log(initialNotification);
};
