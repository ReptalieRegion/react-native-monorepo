import { BottomSheet } from '@reptile-region/bottom-sheet';
import { TouchableTypo, Typo, color } from '@reptile-region/design-system';
import { useOnOff } from '@reptile-region/react-hooks';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, TouchableNativeFeedback, View } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Path, Svg } from 'react-native-svg';

import useCreateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useCreateEntityWeight';
import { useAlert } from '@/components/@common/organisms/Alert';
import type { EntityCreateWeightScreenProps } from '@/types/routes/props/diary';

export default function CreateWeightBottomSheet({
    navigation,
    route: {
        params: { entity },
    },
}: EntityCreateWeightScreenProps) {
    const [weight, setWeight] = useState<string>();
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();
    const { openAlert } = useAlert();

    const bottomSheetClose = useCallback(() => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [navigation]);

    const { mutate } = useCreateEntityWeight({
        onError: (error) => {
            console.log(error);
            if (error.statusCode === 417) {
                openAlert({
                    title: '이미 무게가 등록되어 있어요\n무게를 수정하시겠어요?',
                    contents: '언제든지 다시 등록할 수 있어요',
                    buttons: [
                        { text: '취소', type: 'cancel' },
                        { text: '확인', type: 'ok' },
                    ],
                });
            }
        },
        onSuccess: () => {
            bottomSheetClose();
        },
    });

    const handleConfirm = (date: Date) => {
        setSelectedDate(date);
        datePickerOff();
    };

    const handleChangeText = (text: string) => {
        setWeight(text);
    };

    const header = useCallback(() => {
        const handleCreateEntityWeight = () => {
            if (weight !== undefined && weight?.length !== 0) {
                mutate({ diaryId: entity.id, date: dayjs(selectedDate).format('YYYY-MM-DD'), weight: Number(weight) });
            }
        };

        return (
            <View style={styles.buttonWrapper}>
                <TouchableTypo variant="title4" color="error" onPress={bottomSheetClose} textAlignVertical="center">
                    취소
                </TouchableTypo>
                <Typo variant="title3">무게 추가</Typo>
                <TouchableTypo variant="title4" color="primary" onPress={handleCreateEntityWeight} textAlignVertical="center">
                    등록
                </TouchableTypo>
            </View>
        );
    }, [bottomSheetClose, mutate, weight, selectedDate, entity.id]);

    return (
        <>
            <BottomSheet onClose={bottomSheetClose} snapInfo={{ pointsFromTop: [300], startIndex: 0 }} header={header}>
                <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContainer}>
                        <Typo variant="title3">무게</Typo>
                        <View style={styles.inputContainer}>
                            <TextInput keyboardType="numeric" onChangeText={handleChangeText} style={styles.input} />
                            <Typo variant="title3">{entity.weightUnit}</Typo>
                        </View>
                        <Typo variant="title3">날짜</Typo>
                        <View style={styles.inputWrapper}>
                            <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <Path
                                    d="M5 22C4.45 22 3.97917 21.8042 3.5875 21.4125C3.19583 21.0208 3 20.55 3 20V6C3 5.45 3.19583 4.97917 3.5875 4.5875C3.97917 4.19583 4.45 4 5 4H6V2H8V4H16V2H18V4H19C19.55 4 20.0208 4.19583 20.4125 4.5875C20.8042 4.97917 21 5.45 21 6V20C21 20.55 20.8042 21.0208 20.4125 21.4125C20.0208 21.8042 19.55 22 19 22H5ZM5 20H19V10H5V20ZM5 8H19V6H5V8ZM12 14C11.7167 14 11.4792 13.9042 11.2875 13.7125C11.0958 13.5208 11 13.2833 11 13C11 12.7167 11.0958 12.4792 11.2875 12.2875C11.4792 12.0958 11.7167 12 12 12C12.2833 12 12.5208 12.0958 12.7125 12.2875C12.9042 12.4792 13 12.7167 13 13C13 13.2833 12.9042 13.5208 12.7125 13.7125C12.5208 13.9042 12.2833 14 12 14ZM8 14C7.71667 14 7.47917 13.9042 7.2875 13.7125C7.09583 13.5208 7 13.2833 7 13C7 12.7167 7.09583 12.4792 7.2875 12.2875C7.47917 12.0958 7.71667 12 8 12C8.28333 12 8.52083 12.0958 8.7125 12.2875C8.90417 12.4792 9 12.7167 9 13C9 13.2833 8.90417 13.5208 8.7125 13.7125C8.52083 13.9042 8.28333 14 8 14ZM16 14C15.7167 14 15.4792 13.9042 15.2875 13.7125C15.0958 13.5208 15 13.2833 15 13C15 12.7167 15.0958 12.4792 15.2875 12.2875C15.4792 12.0958 15.7167 12 16 12C16.2833 12 16.5208 12.0958 16.7125 12.2875C16.9042 12.4792 17 12.7167 17 13C17 13.2833 16.9042 13.5208 16.7125 13.7125C16.5208 13.9042 16.2833 14 16 14ZM12 18C11.7167 18 11.4792 17.9042 11.2875 17.7125C11.0958 17.5208 11 17.2833 11 17C11 16.7167 11.0958 16.4792 11.2875 16.2875C11.4792 16.0958 11.7167 16 12 16C12.2833 16 12.5208 16.0958 12.7125 16.2875C12.9042 16.4792 13 16.7167 13 17C13 17.2833 12.9042 17.5208 12.7125 17.7125C12.5208 17.9042 12.2833 18 12 18ZM8 18C7.71667 18 7.47917 17.9042 7.2875 17.7125C7.09583 17.5208 7 17.2833 7 17C7 16.7167 7.09583 16.4792 7.2875 16.2875C7.47917 16.0958 7.71667 16 8 16C8.28333 16 8.52083 16.0958 8.7125 16.2875C8.90417 16.4792 9 16.7167 9 17C9 17.2833 8.90417 17.5208 8.7125 17.7125C8.52083 17.9042 8.28333 18 8 18ZM16 18C15.7167 18 15.4792 17.9042 15.2875 17.7125C15.0958 17.5208 15 17.2833 15 17C15 16.7167 15.0958 16.4792 15.2875 16.2875C15.4792 16.0958 15.7167 16 16 16C16.2833 16 16.5208 16.0958 16.7125 16.2875C16.9042 16.4792 17 16.7167 17 17C17 17.2833 16.9042 17.5208 16.7125 17.7125C16.5208 17.9042 16.2833 18 16 18Z"
                                    fill={color.Gray[500].toString()}
                                />
                            </Svg>
                            <TouchableTypo color="sub-placeholder" onPress={datePickerOn}>
                                {dayjs(selectedDate).format('YYYY.MM.DD')}
                            </TouchableTypo>
                        </View>
                    </View>
                </TouchableNativeFeedback>
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
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        gap: 10,
        padding: 20,
        backgroundColor: color.White.toString(),
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    buttonWrapper: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    inputContainer: {
        flexDirection: 'row',
    },
    input: {
        borderBottomWidth: 1,
        width: 68,
    },
});
