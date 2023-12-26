import { BottomSheet, useBottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

import useUpdateCalendarItem from '../../hooks/mutations/useUpdateCalendarItem';

import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';

type MemoUpdateBottomSheetState = {
    isOpen: boolean;
    calendar: {
        id: string;
        memo: string;
    };
    searchDate: string;
};

interface MemoUpdateBottomSheetActions {
    onClose(): void;
}

export type MemoUpdateBottomSheetProps = MemoUpdateBottomSheetState & MemoUpdateBottomSheetActions;

export default function MemoUpdateBottomSheet({ isOpen, onClose, calendar, searchDate }: MemoUpdateBottomSheetProps) {
    const [memo, setMemo] = useState(calendar.memo);

    const renderHeader = useCallback(() => {
        return (
            <View style={headerStyles.container}>
                <Typo variant="title3">메모 수정</Typo>
            </View>
        );
    }, []);

    return (
        <ConditionalRenderer
            condition={isOpen}
            trueContent={
                <BottomSheet onClose={onClose} snapInfo={{ pointsFromTop: [300], startIndex: 0 }} header={renderHeader}>
                    <View style={styles.wrapper}>
                        <TextInput
                            style={textInputStyles.wrapper}
                            defaultValue={calendar.memo}
                            value={memo}
                            onChangeText={setMemo}
                        />
                        <Button calendar={calendar} searchDate={searchDate} memo={memo} />
                    </View>
                </BottomSheet>
            }
        />
    );
}

function Button({
    searchDate,
    calendar,
    memo,
}: Pick<MemoUpdateBottomSheetProps, 'calendar' | 'searchDate'> & { memo: string }) {
    const { bottomSheetClose } = useBottomSheet();
    const { mutate } = useUpdateCalendarItem({ searchDate, onSuccess: bottomSheetClose });

    const handleSubmit = () => {
        mutate({ calendarId: calendar.id, memo });
    };

    return (
        <View style={styles.buttonWrapper}>
            <ConfirmButton size="modal" text="수정하기" onPress={handleSubmit} />
        </View>
    );
}

const headerStyles = StyleSheet.create({
    container: {
        alignItems: 'center',
        borderBottomWidth: 0.5,
        padding: 10,
        width: '100%',
        borderBottomColor: color.Gray[250].toString(),
    },
});

const textInputStyles = StyleSheet.create({
    wrapper: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: color.DarkGray[500].toString(),
    },
});

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingHorizontal: 20,
    },
    buttonWrapper: {
        marginTop: 'auto',
    },
});
