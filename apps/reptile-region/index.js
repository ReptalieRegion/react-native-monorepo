/**
 * @format
 */

import { AppRegistry } from 'react-native';

import ENV from '@/env';
import notifee from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';

if (__DEV__ && ENV.isDev) {
    import('react-native-url-polyfill/auto').then(() => {
        import('./src/mocks/native').then(async ({ native }) => {
            native.listen({ onUnhandledRequest: 'bypass' });
            const response = await fetch(ENV.END_POINT_URI + 'api/sign-up', { method: 'POST' });
            const data = await response.json();
            AsyncStorage.setItem(AUTH_KEYS[0], data.userId);
        });
    });
}

const onMessageReceived = async (message) => {
    console.log('back\n', message);
    const data = message.data;
    if (data && typeof data === 'string') {
        const newData = JSON.parse(data);
        notifee.displayNotification(newData.notifee);
    } else {
        notifee.displayNotification({
            title: message.notification?.title,
            body: message.notification?.body,
        });
    }
};

messaging().setBackgroundMessageHandler(onMessageReceived);

notifee.onBackgroundEvent(async (notification) => {
    console.log(notification);
});

AppRegistry.registerComponent(appName, () => App);
