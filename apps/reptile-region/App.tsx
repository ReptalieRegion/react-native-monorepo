import Notifee from '@notifee/react-native';
import firebase from '@react-native-firebase/app';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { firebaseService } from '@/env/firebase';
import Toast from '@/overlay/Toast';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

const onMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    await Notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
    });
};

const onBackgroundMessage = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    await Notifee.displayNotification({
        title: message.notification?.title,
        body: message.notification?.body,
    });
};

const fcmMessaging = messaging();

fcmMessaging.setBackgroundMessageHandler(onBackgroundMessage);

export default function App() {
    useEffect(() => {
        const init = async () => {
            if (Platform.OS === 'ios') {
                await Notifee.requestPermission();
            }

            if (!firebase.apps.length) {
                await firebase.initializeApp(firebaseService);
            } else {
                firebase.app();
            }

            const fcmToken = await fcmMessaging.getToken();
            fcmMessaging.onMessage(onMessage);
            console.log(fcmToken);
        };
        init().catch(console.error);
    }, []);

    return (
        <ReactQueryProvider>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <Toast>
                        <RootRoutes />
                    </Toast>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ReactQueryProvider>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});
