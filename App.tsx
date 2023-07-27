import React from 'react';
import RootRoutes from '@/routes/RootRoutes';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import ReactQueryContextComponent from '@/contexts/react-query/ReactQueryContext';
import 'react-native-gesture-handler';

export default function App() {
    return (
        <ReactQueryContextComponent>
            <UIPromptsContextComponent>
                <RootRoutes />
            </UIPromptsContextComponent>
        </ReactQueryContextComponent>
    );
}
