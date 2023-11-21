import notifee, { AndroidImportance, AndroidVisibility, EventType, type NotificationIOS } from '@notifee/react-native';
import type { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import type { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import { Platform } from 'react-native';

import type { RootRoutesParamList } from '<routes/root>';

type NotifeeOptions = {
    ios: NotificationIOS;
};

type DisplayNotification = {
    title: string;
    body: string;
    image?: string;
    link?: string;
    message: FirebaseMessagingTypes.RemoteMessage;
};

type NotificationData = {
    title: string;
    body: string;
    link: string;
};

const routes = {
    'notification/detail': 'posts/:postId/detail/:type',
    detail: 'users/:nickname',
} as const;

type Route = keyof typeof routes;

class NotifeeManger {
    private deepLink: string | undefined;

    constructor() {}

    deleteDefaultChannel = async () => {
        await notifee.deleteChannel('fcm_fallback_notification_channel');
    };

    messageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
        this.deepLink = undefined;
        const data = this._dataParse(message);
        if (data === undefined) {
            return;
        }

        const { title, body, link } = data;
        const displayNotification = Platform.select({
            ios: this._displayNotificationIOS,
            android: this._displayNotificationAndroid,
        });
        displayNotification?.({ title, body, message, link });
    };

    foregroundEvent = (navigationRef: NavigationContainerRefWithCurrent<RootRoutesParamList>) => {
        return notifee.onForegroundEvent(async ({ type, detail }) => {
            const { notification } = detail;
            const link = detail.notification?.data?.link;

            if (type === EventType.PRESS && notification?.id && typeof link === 'string') {
                const route = this._findMatchingRoute(link);
                switch (route?.screen) {
                    case 'notification/detail':
                        navigationRef.navigate('share-post/modal', {
                            screen: route.screen,
                            params: {
                                postId: route.params?.postId ?? '',
                                type: (route.params?.type as 'like' | 'comment') ?? 'like',
                            },
                        });
                        break;
                    case 'detail':
                        navigationRef.navigate('share-post/modal', {
                            screen: route.screen,
                            params: {
                                isFollow: false,
                                nickname: route.params?.nickname ?? '',
                                profile: {
                                    src: '',
                                },
                            },
                        });
                        break;
                    default:
                        break;
                }

                await notifee.cancelNotification(notification?.id);
            }
        });
    };

    backgroundEvent = () => {
        return notifee.onBackgroundEvent(async ({ type, detail }) => {
            const { notification } = detail;

            if (type === EventType.PRESS && notification?.id) {
                const link = detail.notification?.data?.link;
                const isExistLink = link && typeof link === 'string';
                this.deepLink = isExistLink ? link : undefined;
                await notifee.cancelNotification(notification.id);
            }
        });
    };

    getInitialNotification = () => {
        return notifee.getInitialNotification();
    };

    getDeepLink = () => {
        return this.deepLink;
    };

    private _dataParse = (message: FirebaseMessagingTypes.RemoteMessage) => {
        const data = message.data as NotificationData;
        return data
            ? {
                  title: data.title,
                  body: data.body,
                  link: data.link,
              }
            : undefined;
    };

    private _displayNotificationIOS = ({ title, body, message, link }: DisplayNotification) => {
        const notifeeOptions = message.data?.notifee_options;
        const ios = (notifeeOptions as NotifeeOptions).ios;
        const data = link ? { link } : undefined;

        notifee.displayNotification({ title, body, ios, data });
    };

    private _displayNotificationAndroid = async ({ title, body, message, link }: DisplayNotification) => {
        const android = message.notification?.android;
        const data = link ? { link } : undefined;

        if (android) {
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
                data,
            });
        }
    };

    private _extractParams(pattern: string, route: string) {
        const patternParts = pattern.split('/');
        const routeParts = route.split('/');

        const params: { [key in string]: string } = {};

        routeParts.forEach((routePart, index) => {
            const isParam = routePart.startsWith(':');
            if (!isParam) {
                return;
            }

            const paramName = routePart.substring(1);
            const paramValue = patternParts[index];
            params[paramName] = paramValue;
        });

        return params;
    }

    private _findMatchingRoute(pattern: string) {
        const newPattern = pattern.replace('sharePost://', '');
        const routesArray = Object.entries(routes);

        for (const routeInfo of routesArray) {
            const [screen, route] = routeInfo as [Route, string];
            if (!this._isPatternMatch(newPattern, route)) {
                continue;
            }

            const params = this._extractParams(newPattern, route);
            const isNotExistParams = Object.keys(params).length === 0;
            if (isNotExistParams) {
                continue;
            }

            return { screen, params };
        }

        return null;
    }

    private _isPatternMatch(pattern: string, route: string) {
        const regexPattern = route.replace(/:\w+/g, '([^\\/]+)?');
        const regex = new RegExp(`^${regexPattern}$`);

        return regex.test(pattern);
    }
}

const Notifee = new NotifeeManger();

export default Notifee;
