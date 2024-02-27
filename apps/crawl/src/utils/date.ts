import dayjs from 'dayjs';

dayjs.locale('ko');

export function calculateTimeAgo(postDate: string) {
    const now = dayjs();
    const date = dayjs(postDate);

    const diffInMinutes = now.diff(date, 'minute');
    const diffInHours = now.diff(date, 'hour');
    const diffInDays = now.diff(date, 'day');
    const diffInWeeks = now.diff(date, 'week');
    const diffInYears = now.diff(date, 'year');

    if (diffInMinutes < 1) {
        return '방금 전';
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes}분 전`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간 전`;
    } else if (diffInDays < 7) {
        return `${diffInDays}일 전`;
    } else if (diffInWeeks < 52) {
        return `${diffInWeeks}주 전`;
    } else {
        return `${diffInYears}년 전`;
    }
}

/**
 *
 * @param startDate string - format YYYY-MM-DD
 * @returns string[]
 */
export function generateMonthList(startDate: string) {
    const today = dayjs();
    const monthList = [];

    let currentMonth = today;
    while (currentMonth.isAfter(startDate) || currentMonth.isSame(startDate, 'month')) {
        const monthString = currentMonth.format('YYYY-MM');
        monthList.push(monthString);
        currentMonth = currentMonth.subtract(1, 'month');
    }

    return monthList;
}
