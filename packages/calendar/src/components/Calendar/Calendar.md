# Calendar

-   월간 캘린더를 표시합니다.
-   마킹을 제공합니다.

### Usage

```tsx
import { Calendar, CalendarProvider } from '@crawl/calendar';
import { color } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const MARKED_DATES = {
    '2024-01-12': { marked: true },
    '2024-01-15': { marked: true },
    '2024-01-19': { marked: true },
    '2024-01-23': { marked: true },
    '2024-01-29': { marked: true },
    '2024-01-30': { marked: true },
    '2024-01-31': { marked: true },
};

// 월간 캘린더 페이지
export default function CalendarPage() {
    const today = useRef(dayjs().format('YYYY-MM-DD'));

    return (
        <View style={styles.wrapper}>
            <CalendarProvider>
                <Calendar date={today} minDate="1997-01-01" maxDate="2030-12-01" markedDates={MARKED_DATES} />
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
```

## Props

```ts
type CalendarState = {
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

interface CalendarActions {
    /**
     * 요일 클릭 시
     * @params
     * dateString: 요일 날짜 YYYY-MM-DD 형태
     * index: 현재 달의 인덱스
     */
    onPressDay?(dateString: string, index: number): void;
    /**
     * 헤더의 이전 달 클릭
     */
    onPressLeft?(): void;
    /**
     * 헤더의 다음 달 클릭
     */
    onPressRight?(): void;
}

type CalendarProps = CalendarState & CalendarActions;
```
