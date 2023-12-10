import { Dayjs } from 'dayjs';

const getWeekNumber = (dateForm: Dayjs) => {
    const currentDate = dateForm.date();
    const startOfMonth = dateForm.startOf('month');
    const weekDay = startOfMonth.day();
    const currentWeek = (weekDay - 1 + currentDate) / 7 + 1;

    return Math.floor(currentWeek);
};

const getWeekCountInMonth = (dateForm: Dayjs) => {
    const firstDayOfMonth = dateForm.endOf('month');

    return getWeekNumber(firstDayOfMonth);
};

export const getWeekCountInMonthAndWeekNumber = (currentDate: Dayjs) => {
    return {
        weekCountInMonth: getWeekCountInMonth(currentDate),
        selectedWeekNumber: getWeekNumber(currentDate),
    };
};
