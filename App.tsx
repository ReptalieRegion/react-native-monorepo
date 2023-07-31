import React from 'react';
import RootRoutes from '@/routes/RootRoutes';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import ReactQueryContextComponent from '@/contexts/react-query/ReactQueryContext';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
    return (
        <ReactQueryContextComponent>
            <SafeAreaProvider>
                <UIPromptsContextComponent>
                    <RootRoutes />
                </UIPromptsContextComponent>
            </SafeAreaProvider>
        </ReactQueryContextComponent>
    );
}
