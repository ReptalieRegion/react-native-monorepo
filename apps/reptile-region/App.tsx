import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ReactQueryContextComponent from '@/contexts/react-query/ReactQuery';
import RootRoutes from '@/routes/RootRoutes';

import 'react-native-gesture-handler';

export default function App() {
    return (
        <ReactQueryContextComponent>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <RootRoutes />
                </SafeAreaProvider>
            </GestureHandlerRootView>
        </ReactQueryContextComponent>
    );
}

const styles = StyleSheet.create({
    gestureContainer: {
        flex: 1,
    },
});
