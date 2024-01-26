import { useNavigation } from '@react-navigation/native';
import { useQueryClient, type InfiniteData } from '@tanstack/react-query';
import { useCallback, useMemo } from 'react';

import { DIARY_QUERY_KEYS } from '@/apis/@utils/query-keys';
import useAlert from '@/components/overlay/Alert/useAlert';
import type { FetchEntityListResponse } from '@/types/apis/diary/entity';
import type { InfiniteState } from '@/types/apis/utils';
import type { CalendarDetailParams } from '@/types/routes/params/diary';
import type { CalendarListNavigationProp } from '@/types/routes/props/diary/calendar';

export default function useCalendarListNavigation() {
    const navigation = useNavigation<CalendarListNavigationProp>();
    const queryClient = useQueryClient();
    const openAlert = useAlert();

    const navigateCalendarCreate = useCallback(() => {
        const entity = queryClient.getQueryData<InfiniteData<InfiniteState<FetchEntityListResponse[]>, number>>(
            DIARY_QUERY_KEYS.entityList,
        );
        const pageSize = entity?.pages.reduce((prev, page) => prev + page.items.length, 0);
        const isNotExistEntity = pageSize === 0;
        if (isNotExistEntity) {
            openAlert({
                title: '개체가 필수로 필요해요',
                contents: '개체를 등록하러 갈까요?',
                buttons: [
                    {
                        text: '취소',
                        style: 'cancel',
                    },
                    {
                        text: '등록하기',
                        onPress: () => {
                            navigation.navigate('entity-manager/create', {
                                screen: 'image',
                            });
                        },
                    },
                ],
            });
        } else {
            navigation.navigate('calendar/create');
        }
    }, [navigation, openAlert, queryClient]);

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
