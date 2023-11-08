import notifee, { AuthorizationStatus, EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { ErrorBoundary } from '@reptile-region/error-boundary';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Toast from '@/components/@common/organisms/Toast';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

const onAppBootstrap = async () => {
    const settings = await notifee.requestPermission();

    if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
        const token = await messaging().getToken();
        console.log(token);
    }
};

const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    const data = message.data;
    if (data && typeof data === 'string') {
        const newData = JSON.parse(data) as { notifee: Notification };
        notifee.displayNotification(newData.notifee);
    } else {
        notifee.displayNotification({
            title: message.notification?.title,
            body: message.notification?.body,
        });
    }
};

export default function App() {
    useEffect(() => {
        onAppBootstrap();
        const unsubMessaging = messaging().onMessage(onMessageReceived);

        return () => {
            unsubMessaging();
        };
    }, []);

    useEffect(() => {
        const notification = notifee.onForegroundEvent(({ type, detail }) => {
            console.log('Remote notification info: ', detail.notification?.remote);
            switch (type) {
                case EventType.DISMISSED:
                    console.log('User dismissed notification', detail.notification);
                    break;
                case EventType.PRESS:
                    console.log('User pressed notification', detail.notification);
                    break;
            }
        });

        return () => {
            notification;
        };
    }, []);

    return (
        <ReactQueryProvider>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <Toast>
                        <ErrorBoundary renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}>
                            <RootRoutes />
                        </ErrorBoundary>
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
