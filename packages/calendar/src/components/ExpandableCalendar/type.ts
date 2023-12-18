import type { FlashListProps } from '@shopify/flash-list';

import type { MarkedDates } from '../../types/calendar';

interface AgendaListActions {
    openCalendar(): void;
    closeCalendar(): void;
}

type TitleData = {
    type: 'TITLE';
    dateString: string;
    label: string;
};

type ContentData<TData> = {
    type: 'CALENDAR_ITEM';
    dateString: TData;
} & TData;

type AgendaListProps<TData> = AgendaListActions &
    Omit<FlashListProps<TitleData | ContentData<TData>>, 'viewabilityConfig' | 'onMomentumScrollEnd'>;

type ExpandableCalendarState = {
    date?: string;
    minDate?: string;
    maxDate?: string;
    markedDates?: MarkedDates;
    hideHeader?: boolean;
    dayNames?: string[] | undefined;
};

interface ExpandableCalendarActions {
    onChangeMonth?(dateString: string): void;
}

type ExpandableCalendarProps<TData> = {
    calendarProps: ExpandableCalendarState & ExpandableCalendarActions;
    listProps: Omit<AgendaListProps<TData>, 'openCalendar' | 'closeCalendar'>;
};

interface ExpandableCalendar {
    scrollToDayString(day: string): void;
}

export type { AgendaListActions, AgendaListProps, ContentData, ExpandableCalendar, ExpandableCalendarProps, TitleData };
