import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function CalendarItemCreatePage() {
    return (
        <View style={styes.wrapper}>
            <Typo>hi</Typo>
        </View>
    );
}

const styes = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
