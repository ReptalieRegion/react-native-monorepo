/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { OverlayProvider } from '@crawl/overlay-manager';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import RootRoutes from './src/routes/RootRoutues';

export default function App(): React.JSX.Element {
    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <SafeAreaProvider>
                <OverlayProvider>
                    <RootRoutes />
                </OverlayProvider>
            </SafeAreaProvider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
});
