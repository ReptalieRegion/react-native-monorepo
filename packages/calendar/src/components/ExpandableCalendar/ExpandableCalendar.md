# ExpandableCalendar

-   자연스러운 제스처 및 애니메이션으로 캘린더를 접고 필 수 있습니다.

## Usage

```tsx
import { CalendarProvider, ExpandableCalendar } from '@crawl/calendar';
import { Typo, color } from '@crawl/design-system';
import type { ContentStyle, ListRenderItem } from '@shopify/flash-list';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';

import type { CalendarFlashListItem } from '../../../types/mocks/calendars';

const MARKED_DATES = {
    '2024-01-12': { marked: true },
    '2024-01-15': { marked: true },
    '2024-01-19': { marked: true },
    '2024-01-23': { marked: true },
    '2024-01-29': { marked: true },
    '2024-01-30': { marked: true },
    '2024-01-31': { marked: true },
};

const CALENDAR_LIST_DATA = [
    { dateString: '2024-01-29', label: '29일 Mon요일', type: 'TITLE' },
    { dateString: '2024-01-29', name: 'Mark Bernhard', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-29', name: 'Gladys Bechtelar', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-30', label: '30일 Tue요일', type: 'TITLE' },
    { dateString: '2024-01-30', name: 'Jana Heller', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-30', name: 'Tabitha Crooks', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', label: '12일 Fri요일', type: 'TITLE' },
    { dateString: '2024-01-12', name: 'Cameron Rath', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Diana Bogan', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Peggy Bergstrom', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Angel Waters', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-12', name: 'Mack Lemke', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-15', label: '15일 Mon요일', type: 'TITLE' },
    { dateString: '2024-01-15', name: 'Sonia Glover', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-15', name: 'Matthew Cassin', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-15', name: 'Rex Beier', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', label: '23일 Tue요일', type: 'TITLE' },
    { dateString: '2024-01-23', name: 'Mr. Francis Gusikowski', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', name: 'Juanita Gusikowski', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', name: 'Lisa Stoltenberg', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-23', name: 'Angelo Botsford', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-19', label: '19일 Fri요일', type: 'TITLE' },
    { dateString: '2024-01-19', name: 'Dr. Traci Boyle', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-31', label: '31일 Wed요일', type: 'TITLE' },
    { dateString: '2024-01-31', name: 'Shari Dooley', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-31', name: 'Marilyn Kreiger', type: 'CALENDAR_ITEM' },
    { dateString: '2024-01-31', name: 'Myrtle Kreiger', type: 'CALENDAR_ITEM' },
];

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
```

## Props

```ts
type ExpandableCalendarState = {
    /**
     * 시작 날짜
     */
    date?: string;
    /**
     * 최소 날짜
     */
    minDate?: string;
    /**
     * 최대 날짜
     */
    maxDate?: string;
    /**
     * 캘린더에 표시할 날짜를 키값으로 표시
     * marked: 표시여부
     * dotStyle: 표시할 점 스타일
     * markingStyle: 마킹된 뷰의 스타일
     */
    markedDates?: MarkedDates;
    /**
     * 헤더 여부
     */
    hideHeader?: boolean;
    /**
     * 요일 이름 배열
     * @example [일, 월, 화, 수, 목, 금, 토]
     */
    dayNames?: string[] | undefined;
};

interface ExpandableCalendarActions {
    /**
     * 달이 변경되었을 때 발생하는 이벤트
     */
    onChangeMonth?(dateString: string): void;
    /**
     * 달이 변경할 때 실행되는 함수
     */
    onPressMonth?(): void;
}

type ExpandableCalendarProps<TData> = {
    calendarProps: ExpandableCalendarState & ExpandableCalendarActions;
    /**
     * FlashList의 'viewabilityConfig' | 'onMomentumScrollEnd' 제외한 Props
     */
    listProps: Omit<FlashListProps<TitleData | ContentData<TData>>, 'viewabilityConfig' | 'onMomentumScrollEnd'>;
};
```
