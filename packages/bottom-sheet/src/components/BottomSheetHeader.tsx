import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import BottomSheetAnimatedGesture from './BottomSheetAnimatedGesture';

export type BottomSheetHeaderProps = {
    headerTitle?: string;
    header?(): React.JSX.Element;
};

export default function BottomSheetHeader({ headerTitle, header }: BottomSheetHeaderProps) {
    return (
        <BottomSheetAnimatedGesture>
            <View style={styles.header}>
                <View style={styles.headerBar} />
                {header ? (
                    header()
                ) : headerTitle ? (
                    <View style={styles.headerTitle}>
                        <Typo variant="title3">{headerTitle}</Typo>
                    </View>
                ) : (
                    <></>
                )}
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
        width: 50,
        borderRadius: 6,
        backgroundColor: color.Gray[300].toString(),
    },
    headerTitle: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        padding: 10,
        width: '100%',
        borderBottomColor: color.Gray[250].toString(),
    },
});
