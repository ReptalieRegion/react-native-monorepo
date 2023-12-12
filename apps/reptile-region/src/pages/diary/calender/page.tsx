import { color } from '@reptile-region/design-system';
import dayjs from 'dayjs';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import ExpandableCalendar from '@/components/@common/organisms/Calendars/components/ExpandableCalendar';

export default function ExpandableCalendarScreen() {
    const today = useRef(dayjs().format('YYYY-MM-DD')).current;

    return (
        <View style={styles.wrapper}>
            <ExpandableCalendar date={today} minDate="1997-01-01" maxDate={today} />
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    calendarHeader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        padding: 10,
    },
});
