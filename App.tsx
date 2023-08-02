import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import RootRoutes from '@/routes/RootRoutes';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import ReactQueryContextComponent from '@/contexts/react-query/ReactQueryContext';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';
import 'react-native-gesture-handler';

export default function App() {
    return (
        <ReactQueryContextComponent>
            <GestureHandlerRootView style={styles.gestureContainer}>
                <SafeAreaProvider>
                    <UIPromptsContextComponent>
                        <RootRoutes />
                    </UIPromptsContextComponent>
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
