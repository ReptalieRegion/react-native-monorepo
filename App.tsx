import React from 'react';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import 'react-native-gesture-handler';
import RootRoutes from '@/routes/RootRoutes';

export default function App() {
    return (
        <UIPromptsContextComponent>
            <RootRoutes />
        </UIPromptsContextComponent>
    );
}
