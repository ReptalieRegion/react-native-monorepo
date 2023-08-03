import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ReactQueryContextComponent from '@/contexts/react-query/ReactQueryContext';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import RootRoutes from '@/routes/RootRoutes';

import 'react-native-gesture-handler';
/** @todo react-native-reanimated v3.4.2로 올라가면 이슈 확인 후 삭제 */
import 'react-native-reanimated';

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
