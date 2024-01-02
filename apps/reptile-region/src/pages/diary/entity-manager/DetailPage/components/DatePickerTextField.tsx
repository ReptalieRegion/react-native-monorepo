import { Typo, color, type TextColorType } from '@crawl/design-system';
import dayjs from 'dayjs';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { DatePicker } from '@/assets/icons';

type DatePickerTextFieldState = {
    date: Date;
    disabled?: boolean;
    isDatePickerVisible: boolean;
};

interface DatePickerTextFieldActions {
    onPress?(): void;
    onConfirm(date: Date): void;
    onCancel(): void;
}

type DatePickerTextFieldProps = DatePickerTextFieldState & DatePickerTextFieldActions;

export default function DatePickerTextField({
    date,
    disabled,
    isDatePickerVisible,
    onPress,
    onConfirm,
    onCancel,
}: DatePickerTextFieldProps) {
    const { iconFill, textColor } = generatedColor(!!disabled);

    return (
        <>
            <View style={styles.content}>
                <Typo variant="title3">등록일</Typo>
                <TouchableOpacity onPress={onPress} disabled={disabled}>
                    <View style={styles.inputWrapper}>
                        <DatePicker fill={iconFill} />
                        <Typo color={textColor}>{dayjs(date).format('YYYY.MM.DD')}</Typo>
                    </View>
                </TouchableOpacity>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={date}
                maximumDate={dayjs().toDate()}
                mode="date"
                confirmTextIOS="확인"
                display="inline"
                cancelTextIOS="취소"
                onConfirm={onConfirm}
                onCancel={onCancel}
            />
        </>
    );
}

function generatedColor(disabled: boolean): { textColor: TextColorType; iconFill: string } {
    if (disabled) {
        return { textColor: 'placeholder', iconFill: color.Gray[500].toString() };
    }

    return { textColor: 'default', iconFill: color.DarkGray[500].toString() };
}

const styles = StyleSheet.create({
    content: {
        gap: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: color.Gray[500].toString(),
        borderRadius: 10,
        gap: 10,
        height: 45,
    },
});
