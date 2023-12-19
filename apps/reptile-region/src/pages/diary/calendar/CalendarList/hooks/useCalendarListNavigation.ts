import { useNavigation } from '@react-navigation/native';
import { useCallback, useMemo } from 'react';

import type { CalendarDetailParams } from '@/types/routes/params/diary';
import type { CalendarListNavigationProp } from '@/types/routes/props/diary/calendar';

export default function useCalendarListNavigation() {
    const navigation = useNavigation<CalendarListNavigationProp>();

    const navigateCalendarCreate = useCallback(() => {
        navigation.navigate('calendar/create');
    }, [navigation]);

    const navigateCalendarDetail = useCallback(
        (params: CalendarDetailParams) => {
            navigation.navigate('calendar/detail', params);
        },
        [navigation],
    );

    return useMemo(
        () => ({
            navigateCalendarCreate,
            navigateCalendarDetail,
        }),
        [navigateCalendarCreate, navigateCalendarDetail],
    );
}
