import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';

import BottomSheetAnimatedGesture from './BottomSheetAnimatedGesture';

export type BottomSheetHeaderProps = {
    header?(): React.JSX.Element;
};

export default function BottomSheetHeader({ header }: BottomSheetHeaderProps) {
    const { width } = useWindowDimensions();

    return (
        <BottomSheetAnimatedGesture>
            <View style={styles.header}>
                <View style={[styles.headerBar, { width: width * 0.3 }]} />
                {header?.()}
            </View>
        </BottomSheetAnimatedGesture>
    );
}

const styles = StyleSheet.create({
    header: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 15,
    },
    headerBar: {
        height: 5,
        borderRadius: 6,
        backgroundColor: color.Gray[400].toString(),
    },
});
