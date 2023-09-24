/**
 * @format
 */

import { AppRegistry } from 'react-native';

import App from './App';
import { name as appName } from './app.json';
import ENV from '@/env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_KEYS } from '@/env/constants';

// if (__DEV__) {
//     import('react-native-url-polyfill/auto').then(() => {
//         import('./src/mocks/native').then(async ({ native }) => {
//             native.listen({ onUnhandledRequest: 'bypass' });
//             const response = await fetch(ENV.END_POINT_URI + 'api/sign-up', { method: 'POST' });
//             const data = await response.json();
//             AsyncStorage.setItem(AUTH_KEYS[0], data.userId);
//         });
//     });
// }

AppRegistry.registerComponent(appName, () => App);
