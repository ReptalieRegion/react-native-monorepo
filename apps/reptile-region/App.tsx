import { useNavigationContainerRef } from '@react-navigation/native';
import { ErrorBoundary } from '@reptile-region/error-boundary';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Alert from '@/components/@common/organisms/Alert';
import Toast from '@/components/@common/organisms/Toast';
import { Auth } from '@/components/auth/organisms/Auth';
import useEffectNotifee from '@/hooks/notification/useEffectNotifee';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';
import type { RootRoutesParamList } from '@/types/routes/param-list';

export default function App() {
    const navigationRef = useNavigationContainerRef<RootRoutesParamList>();
    useEffectNotifee(navigationRef);

    return (
        <ReactQueryProvider>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <Toast>
                        <Alert>
                            <Auth>
                                <ErrorBoundary
                                    renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}
                                >
                                    <RootRoutes navigationRef={navigationRef} />
                                </ErrorBoundary>
                            </Auth>
                        </Alert>
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
