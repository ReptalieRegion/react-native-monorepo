import { BottomSheet, useBottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import TagTextCheckBox from '../../components/TagTextCheckBox';
import { markTypeArray } from '../../constants';
import useUpdateCalendarItem from '../../hooks/mutations/useUpdateCalendarItem';

import { ConditionalRenderer } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { DiaryCalendarMarkType } from '@/types/apis/diary/calendar';

type TagUpdateBottomSheetState = {
    isOpen: boolean;
    calendar: {
        id: string;
        markType: DiaryCalendarMarkType[];
    };
    searchDate: string;
};

interface TagUpdateBottomSheetActions {
    onClose(): void;
}

export type TagUpdateBottomSheetProps = TagUpdateBottomSheetState & TagUpdateBottomSheetActions;

export default function TagUpdateBottomSheet({ isOpen, onClose, calendar, searchDate }: TagUpdateBottomSheetProps) {
    const [markTypeCheckedArray, setMarkTypeCheckedArray] = useState<DiaryCalendarMarkType[]>(calendar.markType);

    const handlePressTag = useCallback((markType: DiaryCalendarMarkType, isChecked: boolean) => {
        setMarkTypeCheckedArray((prev) => {
            if (isChecked) {
                return [...prev, markType];
            }

            return prev.filter((prevMarkType) => prevMarkType !== markType);
        });
    }, []);

    const renderHeader = useCallback(() => {
        return (
            <View style={headerStyles.container}>
                <Typo variant="title3">태그 수정</Typo>
            </View>
        );
    }, []);

    return (
        <ConditionalRenderer
            condition={isOpen}
            trueContent={
                <BottomSheet onClose={onClose} snapInfo={{ pointsFromTop: [300], startIndex: 0 }} header={renderHeader}>
                    <View style={styles.wrapper}>
                        <View style={styles.actionWrapper}>
                            {markTypeArray.map(({ label, markType }) => (
                                <TagTextCheckBox
                                    key={label}
                                    label={label}
                                    initialChecked={
                                        calendar.markType.findIndex((checkedMarkType) => checkedMarkType === markType) !== -1
                                    }
                                    onChangeChecked={(isChecked) => handlePressTag(markType, isChecked)}
                                />
                            ))}
                        </View>
                        <Button
                            calendar={calendar}
                            searchDate={searchDate}
                            markTypeCheckedArray={markTypeCheckedArray}
                            disabled={markTypeCheckedArray.length === 0}
                        />
                    </View>
                </BottomSheet>
            }
        />
    );
}

function Button({
    searchDate,
    calendar,
    markTypeCheckedArray,
    disabled,
}: Pick<TagUpdateBottomSheetProps, 'calendar' | 'searchDate'> & {
    disabled: boolean;
    markTypeCheckedArray: DiaryCalendarMarkType[];
}) {
    const { bottomSheetClose } = useBottomSheet();
    const { mutate } = useUpdateCalendarItem({ searchDate, onSuccess: bottomSheetClose });

    const handleSubmit = () => {
        mutate({ calendarId: calendar.id, markType: markTypeCheckedArray });
    };

    return (
        <View style={styles.buttonWrapper}>
            <ConfirmButton size="modal" text="수정하기" onPress={handleSubmit} disabled={disabled} />
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

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
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
