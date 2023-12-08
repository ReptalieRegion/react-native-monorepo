import React, { useCallback, useRef } from 'react';
import { AgendaList, CalendarProvider, ExpandableCalendar, WeekCalendar } from 'react-native-calendars';

import AgendaItem from './AgendaItem';
import { agendaItems, getMarkedDates } from './data';

const ITEMS: any[] = agendaItems;

interface Props {
    weekView?: boolean;
}

const ExpandableCalendarScreen = (props: Props) => {
    const { weekView } = props;
    const marked = useRef(getMarkedDates());

    // const onDateChanged = useCallback((date, updateSource) => {
    //   console.log('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // }, []);

    // const onMonthChange = useCallback(({dateString}) => {
    //   console.log('ExpandableCalendarScreen onMonthChange: ', dateString);
    // }, []);

    const renderItem = useCallback(({ item }: any) => {
        return <AgendaItem item={item} />;
    }, []);

    return (
        <CalendarProvider
            date={ITEMS[1]?.title}
            // onDateChanged={onDateChanged}
            // onMonthChange={onMonthChange}
            showTodayButton
            // disabledOpacity={0.6}
            // todayBottomMargin={16}
        >
            {weekView ? (
                <WeekCalendar firstDay={1} markedDates={marked.current} />
            ) : (
                <ExpandableCalendar
                    // horizontal={false}
                    // hideArrows
                    // disablePan
                    // hideKnob
                    // initialPosition={ExpandableCalendar.positions.OPEN}
                    // calendarStyle={styles.calendar}
                    // headerStyle={styles.header} // for horizontal only
                    // disableWeekScroll
                    // disableAllTouchEventsForDisabledDays
                    firstDay={1}
                    markedDates={marked.current}
                    animateScroll
                    // closeOnDayPress={false}
                />
            )}
            <AgendaList
                sections={ITEMS}
                renderItem={renderItem}
                // scrollToNextEvent
                // dayFormat={'yyyy-MM-d'}
            />
        </CalendarProvider>
    );
};

export default ExpandableCalendarScreen;
