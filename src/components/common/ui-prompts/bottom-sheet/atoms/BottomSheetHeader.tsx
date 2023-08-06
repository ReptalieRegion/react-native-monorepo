import React, { ReactNode } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';

import { color } from '@/components/common/tokens/colors';

export interface BottomSheetHeaderProps {
    title?: ReactNode;
}

const { width } = Dimensions.get('screen');

const BottomSheetHeader = ({ title }: BottomSheetHeaderProps) => {
    return (
        <View style={styles.header}>
            <View style={styles.headerBar} />
            {title}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
        paddingBottom: 15,
    },
    headerBar: {
        width: width * 0.3,
        height: 5,
        borderRadius: 6,
        backgroundColor: color.Gray[400].toString(),
    },
});

export default BottomSheetHeader;
