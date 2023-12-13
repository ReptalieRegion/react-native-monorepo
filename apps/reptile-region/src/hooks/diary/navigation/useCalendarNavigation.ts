import { useNavigation } from '@react-navigation/native';

import type { CalendarNavigationProp } from '@/types/routes/props/diary/entity';

export default function useCalendarNavigation() {
    const navigation = useNavigation<CalendarNavigationProp>();

    const navigateCalendarCreate = () => {
        navigation.navigate('calendar/create');
    };

    return {
        navigateCalendarCreate,
    };
}
