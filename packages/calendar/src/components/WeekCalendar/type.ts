import type { MarkedDates } from '../../types/calendar';

type WeekCalendarState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    containerStyle?: {
        width: number;
    };
    hideHeader?: boolean;
    dayNames?: string[];
};

interface WeekCalendarActions {
    onPressDay?(dateString: string): void;
    onChangePage?(index: number): void;
    onPressLeft?(): void;
    onPressRight?(): void;
}

type WeekCalendarProps = WeekCalendarState & WeekCalendarActions;

export type { WeekCalendarActions, WeekCalendarProps, WeekCalendarState };
