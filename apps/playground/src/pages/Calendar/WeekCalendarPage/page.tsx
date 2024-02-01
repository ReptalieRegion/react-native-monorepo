import { CalendarProvider, WeekCalendar } from '@crawl/calendar';
import { color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { MARKED_DATES } from '../../../mocks/calendar';

export default function WeekCalendarPage() {
    const today = dayjs().format('YYYY-MM-DD');

    return (
        <View style={styles.wrapper}>
            <CalendarProvider>
                <WeekCalendar date={today} minDate="1997-01-01" maxDate="2030-12-01" markedDates={MARKED_DATES} />
            </CalendarProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
});
