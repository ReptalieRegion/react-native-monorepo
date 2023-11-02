import { ErrorBoundary } from '@reptile-region/error-boundary';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import { refreshToken } from '@/apis/auth/repository';
import Toast from '@/overlay/Toast';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

export default function App() {
    useEffect(() => {
        refreshToken();
    }, []);

    return (
        <ErrorBoundary renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}>
            <ReactQueryProvider>
                <GestureHandlerRootView style={styles.gestureContainer}>
                    <SafeAreaProvider>
                        <Toast>
                            <RootRoutes />
                        </Toast>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </ReactQueryProvider>
        </ErrorBoundary>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});
