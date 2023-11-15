import messaging from '@react-native-firebase/messaging';
import { ErrorBoundary } from '@reptile-region/error-boundary';
import React, { useEffect } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Toast from '@/components/@common/organisms/Toast';
import { Auth } from '@/components/auth/organisms/Auth';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';
import {
    notifeeAndroidGetInitialNotification,
    notifeeForegroundEvent,
    notifeeForegroundMessageReceived,
} from '@/utils/notification/notifee';

export default function App() {
    useEffect(() => {
        if (Platform.OS === 'android') {
            notifeeAndroidGetInitialNotification();
        }

        const unMessage = messaging().onMessage(notifeeForegroundMessageReceived);
        const unSubMessaging = Platform.select({
            ios: notifeeForegroundEvent,
            default: () => {},
        });

        return () => {
            unMessage();
            unSubMessaging();
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
