import { ErrorBoundary } from '@reptile-region/error-boundary';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Toast from '@/overlay/Toast';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

export default function App() {
    return (
        <ReactQueryProvider>
            <ErrorBoundary renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}>
                <GestureHandlerRootView style={styles.gestureContainer}>
                    <SafeAreaProvider>
                        <Toast>
                            <RootRoutes />
                        </Toast>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </ErrorBoundary>
        </ReactQueryProvider>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});
