import { useBottomSheet } from '@crawl/bottom-sheet';
import { color } from '@crawl/design-system';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import TagTextCheckBox from '../../components/TagTextCheckBox';
import { markTypeArray } from '../../constants';
import useUpdateCalendarItem from '../../hooks/mutations/useUpdateCalendarItem';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { DiaryCalendarMarkType } from '@/types/apis/diary/calendar';

type TagUpdateBottomSheetState = {
    calendar: {
        id: string;
        markType: DiaryCalendarMarkType[];
    };
    searchDate: string;
};

export type TagUpdateBottomSheetProps = TagUpdateBottomSheetState;

export default function TagUpdateBottomSheet({ calendar, searchDate }: TagUpdateBottomSheetProps) {
    const [markTypeCheckedArray, setMarkTypeCheckedArray] = useState<DiaryCalendarMarkType[]>(calendar.markType);

    const handlePressTag = useCallback((markType: DiaryCalendarMarkType, isChecked: boolean) => {
        setMarkTypeCheckedArray((prev) => {
            if (isChecked) {
                return [...prev, markType];
            }

            return prev.filter((prevMarkType) => prevMarkType !== markType);
        });
    }, []);

    const { bottomSheetClose } = useBottomSheet();
    const { mutate } = useUpdateCalendarItem({ searchDate, onSuccess: bottomSheetClose });

    const handleSubmit = () => {
        mutate({ calendarId: calendar.id, markType: markTypeCheckedArray });
    };

    return (
        <View style={styles.wrapper}>
            <View style={styles.actionWrapper}>
                {markTypeArray.map(({ label, markType }) => (
                    <TagTextCheckBox
                        key={label}
                        label={label}
                        initialChecked={calendar.markType.findIndex((checkedMarkType) => checkedMarkType === markType) !== -1}
                        onChangeChecked={(isChecked) => handlePressTag(markType, isChecked)}
                    />
                ))}
            </View>
            <View style={styles.buttonWrapper}>
                <ConfirmButton
                    size="modal"
                    text="수정하기"
                    onPress={handleSubmit}
                    disabled={markTypeCheckedArray.length === 0}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    actionWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 1,
        backgroundColor: color.White.toString(),
        gap: 8,
    },
    buttonWrapper: {
        marginTop: 'auto',
    },
});
