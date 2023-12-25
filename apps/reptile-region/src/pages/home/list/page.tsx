import React from 'react';
import { StyleSheet, View } from 'react-native';

import ChangeHeader from './header';
import type { HomeListPageScreenProp } from './type';

import { ComingSoonBanner } from '@/components/@common/atoms';

export default function HomeListPage(props: HomeListPageScreenProp) {
    return (
        <View style={styles.container}>
            <ChangeHeader {...props} />
            <ComingSoonBanner />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
