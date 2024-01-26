import { useNavigation } from '@react-navigation/native';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useBaseCreateCalendarItem from '@/apis/diary/calendar/hooks/mutations/useBaseCreateCalendarItem';
import useGlobalLoading from '@/components/@common/organisms/Loading/useGlobalLoading';
import type { CalendarItemCreateNavigationProp } from '@/types/routes/props/diary/calendar';

export default function useCreateCalendarItem() {
    const queryClient = useQueryClient();
    const navigation = useNavigation<CalendarItemCreateNavigationProp>();
    const { openLoading, closeLoading } = useGlobalLoading();

    return useBaseCreateCalendarItem({
        onMutate: openLoading,
        onSettled: closeLoading,
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({
                queryKey: DIARY_QUERY_KEYS.calendarDate(dayjs(variables.date).startOf('month').format('YYYY-MM-DD')),
                exact: true,
            });
            navigation.navigate('bottom-tab/routes', {
                screen: 'tab',
                params: {
                    screen: 'diary/routes',
                    params: {
                        screen: 'calender',
                        params: {
                            screen: 'main',
                            params: {
                                initialDateString: dayjs(variables.date).format('YYYY-MM-DD'),
                            },
                        },
                    },
                },
            });
        },
    });
}
