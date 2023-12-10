import { color } from '@reptile-region/design-system';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import ExpandableCalendar from '@/components/@common/organisms/Calendars/components/ExpandableCalendar';
import Calendar from '@/components/@common/organisms/Calendars/providers/Calendar';

export default function ExpandableCalendarScreen() {
    return (
        <Calendar>
            <View style={styles.wrapper}>
                <ExpandableCalendar />
            </View>
        </Calendar>
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
