/**
 * @format
 */

import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { notifeeBackgroundEvent, notifeeBackgroundMessageReceived } from './src/utils/notification/notifee';

// if (__DEV__ && ENV.isDev) {
//     import('react-native-url-polyfill/auto').then(() => {
//         import('./src/mocks/native').then(async ({ native }) => {
//             native.listen({ onUnhandledRequest: 'bypass' });
//             const response = await fetch(ENV.END_POINT_URI + 'api/sign-up', { method: 'POST' });
//             const data = await response.json();
//             AsyncStorage.setItem(AUTH_KEYS[0], data.userId);
//         });
//     });
// }

notifeeBackgroundEvent();
messaging().setBackgroundMessageHandler(notifeeBackgroundMessageReceived);

AppRegistry.registerComponent(appName, () => App);
