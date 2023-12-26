import { Typo } from '@crawl/design-system';
import type { NativeStackHeaderProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import type { UseDeleteCalendarItemState } from './hooks/mutations/useDeleteCalendarItem';
import useDeleteCalendarItem from './hooks/mutations/useDeleteCalendarItem';

import { createNativeStackHeader } from '@/components/@common/molecules';
import type { DeleteCalendar } from '@/types/apis/diary/calendar';
import type { CalendarDetailScreenProps } from '@/types/routes/props/diary/calendar';

export function CalendarDetailHeader(props: NativeStackHeaderProps) {
    return createNativeStackHeader({
        leftIcon: 'back',
        title: '상세 보기',
    })(props);
}

export default function ChangeHeader({
    navigation,
    searchDate,
    calendarId,
}: Pick<CalendarDetailScreenProps, 'navigation'> & UseDeleteCalendarItemState & DeleteCalendar['Request']) {
    const { mutate, isPending } = useDeleteCalendarItem({ searchDate });

    useEffect(() => {
        const headerRight = () => {
            return (
                <TouchableOpacity
                    onPress={() => mutate({ calendarId })}
                    style={style.wrapper}
                    containerStyle={style.container}
                    disabled={isPending}
                >
                    <Typo color={'error'} disabled={isPending}>
                        삭제
                    </Typo>
                </TouchableOpacity>
            );
        };

        navigation.setOptions({ headerRight });
    }, [navigation, isPending, mutate, calendarId]);

    return null;
}

// TODO: 터치 영역 넓히기 위해 임시 방편으로 막음 수정 필요
const style = StyleSheet.create({
    wrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        marginRight: -20,
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
});
