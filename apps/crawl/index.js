/**
 * @format
 */

import { AppRegistry } from 'react-native';

import messaging from '@react-native-firebase/messaging';
import App from './App';
import { name as appName } from './app.json';
import Notifee from './src/utils/notification/notifee';

Notifee.deleteDefaultChannel();
Notifee.backgroundEvent();
messaging().setBackgroundMessageHandler(Notifee.messageReceived);

AppRegistry.registerComponent(appName, () => App);
