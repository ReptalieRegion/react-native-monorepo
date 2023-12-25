import dayjs from 'dayjs';

dayjs.locale('ko');

export const calculateTimeAgo = (postDate: string) => {
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
        return `${diffInMinutes}분`;
    } else if (diffInHours < 24) {
        return `${diffInHours}시간`;
    } else if (diffInDays < 7) {
        return `${diffInDays}일`;
    } else if (diffInWeeks < 52) {
        return `${diffInWeeks}주`;
    } else {
        return `${diffInYears}년`;
    }
};
