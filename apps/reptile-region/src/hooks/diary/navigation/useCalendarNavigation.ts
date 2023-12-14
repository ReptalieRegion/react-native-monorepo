import { useNavigation } from '@react-navigation/native';

import type { CalendarNavigationProp } from '@/types/routes/props/diary/calendar';

export default function useCalendarNavigation() {
    const navigation = useNavigation<CalendarNavigationProp>();

    const navigateCalendarCreate = () => {
        navigation.navigate('calendar/create');
    };

    return {
        navigateCalendarCreate,
    };
}
