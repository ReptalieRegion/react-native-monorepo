import { ErrorBoundary } from '@crawl/error-boundary';
import { OverlayProvider } from '@crawl/overlay-manager';
import { useNavigationContainerRef } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import Loading from '@/components/@common/organisms/Loading/LoadingProvider';
import useEffectNotifee from '@/hooks/useEffectNotifee';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';
import type { RootRoutesParamList } from '@/types/routes/param-list';

export default function App(): React.JSX.Element {
    const navigationRef = useNavigationContainerRef<RootRoutesParamList>();
    useEffectNotifee(navigationRef);

    return (
        <Loading>
            <ReactQueryProvider>
                <GestureHandlerRootView style={styles.gestureContainer}>
                    <SafeAreaProvider>
                        <OverlayProvider>
                            <ErrorBoundary renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}>
                                <RootRoutes navigationRef={navigationRef} />
                            </ErrorBoundary>
                        </OverlayProvider>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </ReactQueryProvider>
        </Loading>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});
