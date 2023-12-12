import dayjs, { Dayjs } from 'dayjs';

import type { DateType } from '../type';

const WEEK = 7;

const dateFormat = (currentDay: dayjs.Dayjs): DateType => {
    return {
        dayString: currentDay.format('YYYY-MM-DD'),
        year: currentDay.year(),
        month: currentDay.month() + 1,
        date: currentDay.date(),
    };
};

export const getMonthArray = (date: string) => {
    const dateDayjs = dayjs(date);

    const startMonth = dateDayjs.startOf('month');
    const startDay = startMonth.day();
    const currentDaysInMonth = dateDayjs.daysInMonth();

    const leafDay = (startDay + currentDaysInMonth) % WEEK !== 0 ? WEEK - ((startDay + currentDaysInMonth) % WEEK) : 0;
    const totalCount = startDay + currentDaysInMonth + leafDay;

    const monthArray = [];
    const startDate = startMonth.subtract(startDay, 'day');
    for (let i = 0; i < totalCount; i++) {
        monthArray.push(dateFormat(startDate.add(i, 'day')));
    }

    return monthArray;
};

export const getWeekOfMonthArray = (date: string) => {
    const monthArray = getMonthArray(date);

    const weekOfMonthArray = [];
    for (let i = 0; i < monthArray.length; i += WEEK) {
        weekOfMonthArray.push(monthArray.slice(i, i + WEEK));
    }

    return weekOfMonthArray;
};

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
