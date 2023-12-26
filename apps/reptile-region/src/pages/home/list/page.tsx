import React from 'react';
import { StyleSheet, View } from 'react-native';

import ChangeHeader from './header';

import { ComingSoonBanner } from '@/components/@common/atoms';
import type { HomeListPageScreenProp } from '@/types/routes/props/home/list';

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
