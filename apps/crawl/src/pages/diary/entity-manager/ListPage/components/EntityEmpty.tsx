import { Typo } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

type EntityEmptyState = {};

interface EntityEmptyActions {}

type EntityEmptyProps = EntityEmptyState & EntityEmptyActions;

export default function EntityEmpty({}: EntityEmptyProps) {
    return (
        <View style={styles.wrapper}>
            <Typo variant="heading2">아직 등록된 개체가 없어요</Typo>
            <Typo color="placeholder">개체를 등록하고 관리해보는게 어때요?</Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 50,
        gap: 10,
        alignItems: 'center',
    },
});
