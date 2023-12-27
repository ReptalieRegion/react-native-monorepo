import { color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import NoticeImageCarousel from './components/NoticeImageCarousel';
import ChangeHeader from './header';

import type { HomeListPageScreenProp } from '@/types/routes/props/home/list';

export default function HomeListPage(props: HomeListPageScreenProp) {
    return (
        <View style={styles.container}>
            <ChangeHeader {...props} />
            <NoticeImageCarousel />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
