import { ErrorBoundary, ErrorBoundaryGroup } from '@crawl/error-boundary';
import { OverlayProvider } from '@crawl/overlay-manager';
import { useNavigationContainerRef } from '@react-navigation/native';
import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import CodePush from 'react-native-code-push';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import GlobalLoading from '@/components/@common/organisms/Loading/LoadingProvider';
import useEffectNotifee from '@/hooks/useEffectNotifee';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';
import type { RootRoutesParamList } from '@/types/routes/param-list';

function App(): React.JSX.Element {
    const navigationRef = useNavigationContainerRef<RootRoutesParamList>();
    useEffectNotifee(navigationRef);

    return (
        <GlobalLoading>
            <ReactQueryProvider>
                <GestureHandlerRootView style={styles.gestureContainer}>
                    <SafeAreaProvider>
                        <OverlayProvider>
                            <ErrorBoundaryGroup blockOutside={false}>
                                <ErrorBoundary renderFallback={(props) => <GlobalError {...props} />}>
                                    <Suspense fallback={<View />}>
                                        <RootRoutes navigationRef={navigationRef} />
                                    </Suspense>
                                </ErrorBoundary>
                            </ErrorBoundaryGroup>
                        </OverlayProvider>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </ReactQueryProvider>
        </GlobalLoading>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});

export default CodePush(App);
