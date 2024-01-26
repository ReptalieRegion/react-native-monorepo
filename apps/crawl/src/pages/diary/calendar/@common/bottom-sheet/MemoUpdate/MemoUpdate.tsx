import { useBottomSheet } from '@crawl/bottom-sheet';
import { color } from '@crawl/design-system';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import useUpdateCalendarItem from '../../hooks/mutations/useUpdateCalendarItem';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';

type MemoUpdateBottomSheetState = {
    calendar: {
        id: string;
        memo: string;
    };
    searchDate: string;
};

export type MemoUpdateBottomSheetProps = MemoUpdateBottomSheetState;

export default function MemoUpdateBottomSheet({ calendar, searchDate }: MemoUpdateBottomSheetProps) {
    const { bottomSheetClose } = useBottomSheet();
    const { mutate } = useUpdateCalendarItem({ searchDate, onSuccess: bottomSheetClose });

    const handleSubmit = () => {
        mutate({ calendarId: calendar.id, memo });
    };
    const [memo, setMemo] = useState(calendar.memo);

    return (
        <View style={styles.wrapper}>
            <TextInput
                style={styles.textInputWrapper}
                defaultValue={calendar.memo}
                value={memo}
                onChangeText={setMemo}
                autoFocus
            />
            <View style={styles.buttonWrapper}>
                <ConfirmButton size="modal" text="수정하기" onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    textInputWrapper: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: color.DarkGray[500].toString(),
    },
    buttonWrapper: {
        marginTop: 'auto',
    },
});
