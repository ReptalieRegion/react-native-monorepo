type Title = {
    type: 'TITLE';
    label: string;
    dateString: string;
};

type CalendarItem = {
    type: 'CALENDAR_ITEM';
    dateString: string;
    name: string;
};

type CalendarFlashListItem = Title | CalendarItem;

export type { Title, CalendarItem, CalendarFlashListItem };
