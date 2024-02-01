import { CalendarProvider, ExpandableCalendar } from '@crawl/calendar';
import { Typo, color } from '@crawl/design-system';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import { CALENDAR_LIST_DATA, MARKED_DATES } from '../../../mocks/calendar';
import type { CalendarFlashListItem } from '../../../types/mocks/calendars';

export default function ExpandableCalendarPage() {
    const today = dayjs().format('YYYY-MM-DD');
    const estimatedItemSize = useMemo(() => (styles.titleWrapper.height + styles.itemWrapper.height) / 2, []);

    const renderItem: ListRenderItem<CalendarFlashListItem> = ({ item }) => {
        switch (item.type) {
            case 'TITLE':
                return (
                    <View style={styles.titleWrapper}>
                        <Typo>{item.label}</Typo>
                    </View>
                );
            case 'CALENDAR_ITEM':
                return (
                    <View style={styles.itemWrapper}>
                        <View style={styles.image} />
                        <Typo>{item.name}</Typo>
                    </View>
                );
        }
    };

    return (
        <View style={styles.wrapper}>
            <CalendarProvider>
                <ExpandableCalendar
                    calendarProps={{
                        date: today,
                        minDate: '1997-01-01',
                        maxDate: '2030-12-01',
                        markedDates: MARKED_DATES,
                    }}
                    listProps={{
                        data: CALENDAR_LIST_DATA,
                        renderItem,
                        contentContainerStyle,
                        estimatedItemSize,
                    }}
                />
            </CalendarProvider>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
    },
    titleWrapper: {
        height: 30,
        marginTop: 20,
    },
    itemWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        gap: 20,
    },
    image: {
        borderRadius: 9999,
        width: 40,
        height: 40,
        backgroundColor: color.Gray[400].toString(),
    },
});

const contentContainerStyle: ContentStyle = {
    paddingHorizontal: 20,
    backgroundColor: color.White.toString(),
};
