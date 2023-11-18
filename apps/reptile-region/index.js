/**
 * @format
 */

import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import { Notifee } from './src/utils/notification/notifee';

const notifee = new Notifee();

notifee.notifeeDeleteDefaultChannel();
notifee.notifeeBackgroundEvent();
messaging().setBackgroundMessageHandler(notifee.notifeeBackgroundMessageReceived);

AppRegistry.registerComponent(appName, () => App);
