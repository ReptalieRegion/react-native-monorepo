import { ErrorBoundary } from '@reptile-region/error-boundary';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Toast from '@/components/@common/organisms/Toast';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

export default function App() {
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
