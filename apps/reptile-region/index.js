/**
 * @format
 */

import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { notifeeBackgroundEvent, notifeeBackgroundMessageReceived } from './src/utils/notification/notifee';

notifeeBackgroundEvent();
messaging().setBackgroundMessageHandler(notifeeBackgroundMessageReceived);

AppRegistry.registerComponent(appName, () => App);
