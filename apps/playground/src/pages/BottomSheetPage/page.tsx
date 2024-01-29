import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

import useTestBottomSheet from './bottom-sheet/useTestBottomSheet';

export default function BottomSheetPage() {
    const openTestBottomSheet = useTestBottomSheet();

    return (
        <View style={styles.wrapper}>
            <Button title="BottomSheet Open" onPress={openTestBottomSheet} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
    },
});
