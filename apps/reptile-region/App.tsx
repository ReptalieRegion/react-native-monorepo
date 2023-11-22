import { useNavigationContainerRef } from '@react-navigation/native';
import { ErrorBoundary } from '@reptile-region/error-boundary';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import GlobalError from './error';

import type { RootRoutesParamList } from '<routes/root>';
import { getAccessToken } from '@/apis/auth/utils/secure-storage-token';
import Toast from '@/components/@common/organisms/Toast';
import { Auth } from '@/components/auth/organisms/Auth';
import useEffectNotifee from '@/hooks/useEffectNotifee';
import ReactQueryProvider from '@/providers/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

export default function App() {
    const navigationRef = useNavigationContainerRef<RootRoutesParamList>();
    useEffectNotifee(navigationRef);

    getAccessToken().then((accessToken) => {
        console.log(accessToken);
    });

    return (
        <ReactQueryProvider>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <Toast>
                        <Auth>
                            <ErrorBoundary renderFallback={({ error, reset }) => <GlobalError error={error} reset={reset} />}>
                                <RootRoutes navigationRef={navigationRef} />
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
