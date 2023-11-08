import notifee, { EventType } from '@notifee/react-native';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { ErrorBoundary } from '@reptile-region/error-boundary';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Toast from '@/components/@common/organisms/Toast';
import { Auth } from '@/components/auth/organisms/Auth';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

const onMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
    const notifeeData = message.data?.notifee;
    if (notifeeData && typeof notifeeData === 'string') {
        const newData = JSON.parse(notifeeData);
        notifee.displayNotification(newData);
    } else {
        notifee.displayNotification({
            title: message.notification?.title,
            body: message.notification?.body,
        });
    }
};

export default function App() {
    useEffect(() => {
        const unsubMessaging = messaging().onMessage(onMessageReceived);

        return () => {
            unsubMessaging();
        };
    }, []);

    useEffect(() => {
        const notification = notifee.onForegroundEvent(({ type, detail }) => {
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
            notification();
        };
    }, []);

    return (
        <ReactQueryProvider>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <Toast>
                        <Auth>
                            <ErrorBoundary renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}>
                                <RootRoutes />
                            </ErrorBoundary>
                        </Auth>
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
