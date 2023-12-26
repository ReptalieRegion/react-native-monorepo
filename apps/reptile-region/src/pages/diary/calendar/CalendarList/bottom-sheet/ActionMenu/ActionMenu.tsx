import { useBottomSheet } from '@crawl/bottom-sheet';
import { Typo } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import useMemoUpdateBottomSheet from '../../../@common/bottom-sheet/MemoUpdate/useMemoUpdateBottomSheet';
import useTagUpdateBottomSheet from '../../../@common/bottom-sheet/TagUpdate/useTagUpdateBottomSheet';
import useDeleteCalendarItem from '../../hooks/mutations/useDeleteCalendarItem';

import type { DiaryCalendarMarkType } from '@/types/apis/diary/calendar';

type ActionMenuState = {
    calendar: {
        id: string;
        date: string;
        memo: string;
        markType: DiaryCalendarMarkType[];
    };
    searchDate: string;
};

export type ActionMenuProps = ActionMenuState;

export default function ActionMenuBottomSheet({ calendar, searchDate }: ActionMenuProps) {
    const { mutate } = useDeleteCalendarItem({ searchDate: dayjs(calendar.date).startOf('month').format('YYYY-MM-DD') });
    const openMemoBottomSheet = useMemoUpdateBottomSheet();
    const openTagBottomSheet = useTagUpdateBottomSheet();
    const { bottomSheetClose } = useBottomSheet();

    const list = [
        {
            label: '메모 남기기',
            onPress: async () => {
                await bottomSheetClose();
                openMemoBottomSheet({ calendar: { id: calendar.id, memo: calendar.memo }, searchDate });
            },
        },
        {
            label: '태그 변경하기',
            onPress: async () => {
                await bottomSheetClose();
                openTagBottomSheet({ calendar: { id: calendar.id, markType: calendar.markType }, searchDate });
            },
        },
        {
            label: '삭제',
            onPress: () => {
                mutate({ calendarId: calendar.id });
                bottomSheetClose();
            },
        },
    ];

    return (
        <View style={styles.content}>
            {list.map(({ label, onPress }) => (
                <TouchableOpacity key={label} style={styles.listItem} onPress={onPress}>
                    <Typo>{label}</Typo>
                </TouchableOpacity>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        paddingTop: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
    },
    listItem: {
        paddingTop: 10,
        paddingBottom: 10,
    },
});
