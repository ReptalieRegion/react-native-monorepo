import { color } from '@crawl/design-system';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar } from 'react-native-calendars';

import { MARKED_DATES, agendaItems } from '../../../mocks/calendar';

import AgendaItem from './components/AgendaItem';

interface Props {
    weekView?: boolean;
}

export default function CalendarLibraryPage(props: Props) {
    const { weekView } = props;

    const renderItem = useCallback(({ item }: any) => {
        return <AgendaItem item={item} />;
    }, []);

    return (
        <CalendarProvider date={agendaItems[1].title} showTodayButton>
            {weekView ? (
                <WeekCalendar firstDay={1} markedDates={MARKED_DATES} />
            ) : (
                <ExpandableCalendar firstDay={1} markedDates={MARKED_DATES} />
            )}
            <AgendaList sections={agendaItems} renderItem={renderItem} sectionStyle={styles.section} />
        </CalendarProvider>
    );
}

const styles = StyleSheet.create({
    calendar: {
        paddingLeft: 20,
        paddingRight: 20,
    },
    header: {
        backgroundColor: 'lightgrey',
    },
    section: {
        backgroundColor: color.Gray[100].toString(),
        color: 'grey',
        textTransform: 'capitalize',
    },
});
