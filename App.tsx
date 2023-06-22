import React from 'react';
import RootRoutes from '@/routes';
import UIPromptsContextComponent from '@/contexts/ui-prompts/UIPromptsContext';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function App() {
    return (
        <UIPromptsContextComponent>
            <SafeAreaView style={styles.container}>
                <RootRoutes />
            </SafeAreaView>
        </UIPromptsContextComponent>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
});
