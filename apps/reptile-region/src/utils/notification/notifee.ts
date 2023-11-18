import notifee, { AndroidImportance, AndroidVisibility, EventType, type NotificationIOS } from '@notifee/react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

type NotifeeOptions = {
    ios: NotificationIOS;
};

type DisplayNotification = {
    title: string;
    body: string;
    image?: string;
    message: FirebaseMessagingTypes.RemoteMessage;
};

type NotifeeData = {
    title: string;
    body: string;
    imageUrl: string;
};

export class Notifee {
    constructor() {}

    notifeeDeleteDefaultChannel = async () => {
        await notifee.deleteChannel('fcm_fallback_notification_channel');
    };

    notifeeForegroundMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('===notifeeForegroundMessageReceived===');
        console.log(JSON.stringify(message));
        console.log('===notifeeForegroundMessageReceived===');
        const { title, body } = this._dataParse(message);
        const displayNotification = Platform.select({
            ios: this._displayNotificationIOS,
            android: this._displayNotificationAndroid,
        });
        displayNotification?.({ title, body, message });
    };

    notifeeBackgroundMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('===notifeeBackgroundMessageReceived===start');
        console.log(message);
        const data = this._dataParse(message);
        const displayNotification = Platform.select({
            ios: this._displayNotificationIOS,
            android: this._displayNotificationAndroid,
        });
        displayNotification?.({ title: data.title, body: data.body, message });
        console.log('===notifeeBackgroundMessageReceived===');
    };

    notifeeForegroundEvent = () => {
        return notifee.onForegroundEvent(async ({ type, detail }) => {
            console.log('===onForegroundEvent===');
            console.log(type, detail);
            console.log('===onForegroundEvent===');
            const { notification } = detail;

            if (notification && type === EventType.PRESS && notification.id) {
                await notifee.cancelNotification(notification?.id);
            }
        });
    };

    notifeeBackgroundEvent = () => {
        return notifee.onBackgroundEvent(async ({ type, detail }) => {
            console.log('===onBackgroundEvent===');
            console.log(type, detail);
            console.log('===onBackgroundEvent===');
            const { notification } = detail;

            if (Platform.OS === 'android' && notification?.id) {
                await notifee.cancelNotification(notification.id);
            }

            if (type === EventType.PRESS && notification?.id) {
                await notifee.cancelNotification(notification?.id);
            }
        });
    };

    notifeeGetInitialNotification = async () => {
        const initialNotification = await notifee.getInitialNotification();
        console.log('===notifeeGetInitialNotification===');
        console.log(initialNotification);
        console.log('===notifeeGetInitialNotification===');
    };

    private _dataParse = (message: FirebaseMessagingTypes.RemoteMessage) => {
        const notifeeDataString = message.data?.notifee;
        if (notifeeDataString && typeof notifeeDataString === 'string') {
            const notifeeData = JSON.parse(notifeeDataString) as NotifeeData;

            return {
                title: notifeeData.title,
                body: notifeeData.body,
                imageUrl: notifeeData.imageUrl,
            };
        }

        return {
            title: '크롤',
            body: '새로운 메시지가 도착했어요.',
        };
    };

    private _displayNotificationIOS = ({ title, body, message }: DisplayNotification) => {
        const notifeeOptions = message.data?.notifee_options;
        const ios = (notifeeOptions as NotifeeOptions).ios;
        notifee.displayNotification({ title, body, ios });
    };

    private _displayNotificationAndroid = async ({ title, body, message }: DisplayNotification) => {
        const android = message.notification?.android;
        if (android) {
            console.log(title);
            console.log(body);
            console.log(android);
            const channelId = await notifee.createChannel({
                id: 'important',
                name: 'Important Notifications',
                importance: AndroidImportance.HIGH,
                vibration: true,
                visibility: AndroidVisibility.PUBLIC,
            });
            notifee.displayNotification({
                title,
                body,
                android: {
                    channelId,
                    smallIcon: 'ic_launcher',
                    largeIcon: android?.imageUrl,
                    pressAction: {
                        id: 'default',
                    },
                },
            });
        }
    };
}
