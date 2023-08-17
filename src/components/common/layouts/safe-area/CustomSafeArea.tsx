import React, { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { color } from '../../tokens/colors';

const CustomSafeArea = ({ children }: { children: ReactNode }) => {
    return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.White.toString(),
        flex: 1,
    },
});

export default CustomSafeArea;
