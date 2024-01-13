import type { MarkedDates } from '../../types/calendar';
import type { HeaderActions } from '../@common/type';

type CalendarState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
};

interface CalendarActions {
    onPressDay?(dateString: string, index: number): void;
    onPressLeft?(): void;
    onPressRight?(): void;
}

type CalendarProps = CalendarState & CalendarActions & HeaderActions;

export type { CalendarProps };
