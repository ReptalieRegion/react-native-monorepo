import { BottomSheet, useBottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Keyboard, Modal, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import useCreateOrUpdateEntityWeight from '../../hooks/mutations/useCreateOrUpdateEntityWeight';

import { DatePicker } from '@/assets/icons';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { WeightUnit } from '@/types/apis/diary/entity';

type CreateWeightBottomSheetState = {
    isOpen: boolean;
    entity: {
        id: string;
        weightUnit: WeightUnit;
    };
};

interface CreateWeightBottomSheetActions {
    onClose(): void;
}

export type CreateWeightBottomSheetProps = CreateWeightBottomSheetState & CreateWeightBottomSheetActions;

export default function CreateWeightBottomSheet({ isOpen, entity, onClose }: CreateWeightBottomSheetProps) {
    const [weight, setWeight] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();

    const handleConfirm = useCallback(
        (date: Date) => {
            setSelectedDate(date);
            datePickerOff();
            onClose();
        },
        [datePickerOff, onClose],
    );

    const handleChangeWeight = useCallback((text: string) => {
        const textSize = text.length;
        const reg = /^-?\d*(\.\d*)\.+$/;
        const dotRemoveText = reg.test(text) ? text.slice(0, textSize - 1) : text;
        const newText = dotRemoveText[0] === '.' ? '0' + text : dotRemoveText;
        setWeight(newText);
    }, []);

    return (
        <Modal visible={isOpen} transparent={true}>
            <BottomSheet onClose={onClose} snapInfo={{ pointsFromTop: [450], startIndex: 0 }} header={Header}>
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
                    <SubmitButton entityId={entity.id} selectedDate={selectedDate} weight={weight} />
                </Pressable>
            </BottomSheet>
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
        </Modal>
    );
}

function Header() {
    return (
        <View style={headerStyles.container}>
            <Typo variant="title3">몸무게 추가</Typo>
        </View>
    );
}

function SubmitButton({ entityId, weight, selectedDate }: { entityId: string; weight: string; selectedDate: Date }) {
    const { bottomSheetClose } = useBottomSheet();
    const { mutate, isPending } = useCreateOrUpdateEntityWeight({
        onSuccess: bottomSheetClose,
    });

    const handleCreateEntityWeight = () => {
        if (weight !== undefined && weight?.length !== 0) {
            mutate({
                entityId: entityId,
                date: dayjs(selectedDate).format('YYYY-MM-DD'),
                weight: Number(weight),
            });
        }
    };

    return (
        <View style={[{ marginBottom: Platform.select({ android: 20 }) }]}>
            <ConfirmButton text="등록" onPress={handleCreateEntityWeight} disabled={!weight || isPending} />
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
        backgroundColor: color.White.toString(),
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
        flex: 1,
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
});
