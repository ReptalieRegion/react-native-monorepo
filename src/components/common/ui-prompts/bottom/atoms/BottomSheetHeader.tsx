import { color } from '@/components/common/tokens/colors';
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

const { width } = Dimensions.get('screen');

const BottomSheetHeader = () => {
    return (
        <View style={styles.header}>
            <View style={styles.headerBar} />
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
    },
    headerBar: {
        width: width * 0.3,
        height: 5,
        borderRadius: 6,
        backgroundColor: color.Gray[400].toString(),
    },
});

export default BottomSheetHeader;
