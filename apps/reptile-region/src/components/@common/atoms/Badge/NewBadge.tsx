import { Typo, color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type NewProps = {};

export default function NewBadge({}: NewProps) {
    return (
        <View style={styles.container}>
            <Typo textAlign="center" variant="body4" color="surface">
                N
            </Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: color.Red[300].toString(),
        borderRadius: 9999,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
