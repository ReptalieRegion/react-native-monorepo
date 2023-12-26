import { useBottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import useCreateOrUpdateEntityWeight from '../../hooks/mutations/useCreateOrUpdateEntityWeight';

import { DatePicker } from '@/assets/icons';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { WeightUnit } from '@/types/apis/diary/entity';

type CreateWeightBottomSheetState = {
    entity: {
        id: string;
        weightUnit: WeightUnit;
    };
};

export type CreateWeightBottomSheetProps = CreateWeightBottomSheetState;

export default function CreateWeightBottomSheet({ entity }: CreateWeightBottomSheetProps) {
    const [weight, setWeight] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();

    const handleConfirm = useCallback(
        (date: Date) => {
            setSelectedDate(date);
            datePickerOff();
        },
        [datePickerOff],
    );

    const handleChangeWeight = useCallback((text: string) => {
        const textSize = text.length;
        const reg = /^-?\d*(\.\d*)\.+$/;
        const dotRemoveText = reg.test(text) ? text.slice(0, textSize - 1) : text;
        const newText = dotRemoveText[0] === '.' ? '0' + text : dotRemoveText;
        setWeight(newText);
    }, []);

    const { bottomSheetClose } = useBottomSheet();
    const { mutate, isPending } = useCreateOrUpdateEntityWeight({
        onSuccess: bottomSheetClose,
    });

    const handleCreateEntityWeight = () => {
        if (weight !== undefined && weight?.length !== 0) {
            mutate({
                entityId: entity.id,
                date: dayjs(selectedDate).format('YYYY-MM-DD'),
                weight: Number(weight),
            });
        }
    };

    return (
        <>
            <Pressable onPress={Keyboard.dismiss} style={[styles.wrapper, styles.modalContainer]}>
                <View style={styles.inputGroup}>
                    <View style={styles.content}>
                        <Typo variant="title3">{`몸무게 ${entity.weightUnit}`}</Typo>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                value={weight}
                                keyboardType="numeric"
                                onChangeText={handleChangeWeight}
                                style={styles.input}
                                textAlign="center"
                                autoFocus
                            />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <Typo variant="title3">등록일</Typo>
                        <TouchableOpacity onPress={datePickerOn}>
                            <View style={styles.inputWrapper}>
                                <DatePicker />
                                <Typo color="default">{dayjs(selectedDate).format('YYYY.MM.DD')}</Typo>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.buttonWrapper}>
                    <ConfirmButton text="등록" onPress={handleCreateEntityWeight} disabled={!weight || isPending} />
                </View>
            </Pressable>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                date={selectedDate}
                maximumDate={dayjs().toDate()}
                mode="date"
                confirmTextIOS="확인"
                display="inline"
                cancelTextIOS="취소"
                onConfirm={handleConfirm}
                onCancel={datePickerOff}
            />
        </>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: color.White.toString(),
        paddingBottom: 10,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 20,
    },
    content: {
        gap: 10,
    },
    inputGroup: {
        gap: 20,
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
    input: {
        padding: 0,
        width: '100%',
    },
    inputContainer: {
        flexDirection: 'row',
    },
    buttonWrapper: {
        marginTop: 'auto',
        marginBottom: Platform.select({ android: 20 }),
    },
});
