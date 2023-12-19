import { Typo, color } from '@crawl/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { CalendarDetailScreenProps } from '@/types/routes/props/diary/calendar';

export default function CalendarDetailPage({
    route: {
        params: { calendar },
    },
}: CalendarDetailScreenProps) {
    return (
        <View style={styles.wrapper}>
            <Typo>{calendar.id}</Typo>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
