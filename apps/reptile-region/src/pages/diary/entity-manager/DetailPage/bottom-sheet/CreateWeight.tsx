import { BottomSheet } from '@reptile-region/bottom-sheet';
import { TouchableTypo, Typo } from '@reptile-region/design-system';
import { useOnOff } from '@reptile-region/react-hooks';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Keyboard, Modal, StyleSheet, TouchableNativeFeedback, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { TextField } from '@/components/@common/atoms';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';

type CreateWeightState = {};

interface CreateWeightActions {
    bottomSheet: {
        onClose(): void;
    };
}

type CreateWeightProps = CreateWeightState & CreateWeightActions;

export default function CreateWeightBottomSheet({ bottomSheet }: CreateWeightProps) {
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        datePickerOff();
    };

    const header = () => {
        return (
            <View style={styles.headerContainer}>
                <TouchableTypo variant="title4" color="error">
                    취소
                </TouchableTypo>
                <Typo variant="heading2">무게 추가</Typo>
                <TouchableTypo variant="title4" color="primary">
                    등록
                </TouchableTypo>
            </View>
        );
    };

    return (
        <Modal transparent={true}>
            <BottomSheet onClose={bottomSheet.onClose} snapInfo={{ pointsFromTop: [500], startIndex: 0 }} header={header}>
                <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <ConfirmButton
                            text={dayjs(selectedDate).format('YYYY.MM.DD')}
                            size="medium"
                            variant="outline"
                            onPress={datePickerOn}
                        />
                        <View style={styles.test}>
                            <TextField label="무게" />
                        </View>
                    </View>
                </TouchableNativeFeedback>
            </BottomSheet>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                maximumDate={dayjs().toDate()}
                confirmTextIOS="확인"
                cancelTextIOS="취소"
                onConfirm={handleConfirm}
                onCancel={datePickerOff}
            />
        </Modal>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    container: {
        alignItems: 'flex-start',
        margin: 20,
        height: 135,
        gap: 15,
    },
    test: {
        flexDirection: 'row',
    },
    button: {
        marginLeft: 'auto',
        flexDirection: 'row',
        gap: 10,
    },
});
