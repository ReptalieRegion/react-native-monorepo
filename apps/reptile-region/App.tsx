import { ErrorBoundary } from '@crawl/error-boundary';
import { OverlayProvider } from '@crawl/overlay-manager';
import { useNavigationContainerRef } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import BootSplash from 'react-native-bootsplash';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Loading from '@/components/@common/organisms/Loading/LoadingProvider';
import useEffectNotifee from '@/hooks/useEffectNotifee';
import { AuthProvider } from '@/providers/Auth';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';
import type { RootRoutesParamList } from '@/types/routes/param-list';

export default function App() {
    const navigationRef = useNavigationContainerRef<RootRoutesParamList>();
    useEffectNotifee(navigationRef);

    // 스플레쉬
    useEffect(() => {
        BootSplash.hide({ fade: true });
    }, []);

    return (
        <Loading>
            <AuthProvider>
                <ReactQueryProvider>
                    <GestureHandlerRootView style={styles.gestureContainer}>
                        <SafeAreaProvider>
                            <OverlayProvider>
                                <ErrorBoundary
                                    onError={(error) => {
                                        console.log('error', error);
                                    }}
                                    renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}
                                >
                                    <RootRoutes navigationRef={navigationRef} />
                                </ErrorBoundary>
                            </OverlayProvider>
                        </SafeAreaProvider>
                    </GestureHandlerRootView>
                </ReactQueryProvider>
            </AuthProvider>
        </Loading>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});
