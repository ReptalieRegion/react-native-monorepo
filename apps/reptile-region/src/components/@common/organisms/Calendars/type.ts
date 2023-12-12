import type { Dayjs } from 'dayjs';
import type { DimensionValue } from 'react-native';

import type { ImageType } from '@/types/global/image';

type DateType = {
    dayString: string;
    year: number;
    month: number;
    date: number;
};

type MarkingStyle = {
    height?: DimensionValue;
    width?: DimensionValue;
    backgroundColor?: string;
};

type DotStyle = {
    height?: DimensionValue;
    width?: DimensionValue;
    backgroundColor?: string;
};

type MarkedDates = {
    [key: string]: {
        marked?: boolean;
        dotStyle?: DotStyle;
        markingStyle?: MarkingStyle;
    };
};

type CalendarListItem =
    | string
    | {
          date: string;
          image: ImageType;
          name: string;
          memo: string;
      };

type CalendarState = {
    selectedDate: Dayjs;
    selectedDateString: string;
    minDate: string | undefined;
    maxDate: string | undefined;
    markedDates?: MarkedDates;
    selectedWeekNumber: number;
    weekCountInMonth: number;
};

interface InitDate {
    type: 'INIT_DATE';
    date: string;
    minDate: string | undefined;
    maxDate: string | undefined;
}

interface SetDate {
    type: 'SET_DATE';
    date: string;
}

interface AddMonth {
    type: 'ADD_MONTH';
}

interface SubMonth {
    type: 'SUB_MONTH';
}

type CalendarActions = InitDate | SetDate | AddMonth | SubMonth;

export type {
    AddMonth,
    CalendarActions,
    CalendarListItem,
    CalendarState,
    DateType,
    DotStyle,
    InitDate,
    MarkedDates,
    MarkingStyle,
    SetDate,
    SubMonth,
};
