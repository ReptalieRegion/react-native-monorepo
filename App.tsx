import React from 'react';
import RootRoutes from '@/routes';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import 'react-native-gesture-handler';

export default function App() {
    return (
        <UIPromptsContextComponent>
            <RootRoutes />
        </UIPromptsContextComponent>
    );
}
