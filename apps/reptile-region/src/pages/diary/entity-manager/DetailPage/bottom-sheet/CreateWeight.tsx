import { BottomSheet } from '@reptile-region/bottom-sheet';
import { Typo, color } from '@reptile-region/design-system';
import { useOnOff } from '@reptile-region/react-hooks';
import dayjs from 'dayjs';
import React, { useCallback, useState } from 'react';
import { Alert, Keyboard, StyleSheet, TextInput, TouchableNativeFeedback, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import useCreateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useCreateEntityWeight';
import useUpdateEntityWeight from '@/apis/diary/entity-manager/hooks/mutations/useUpdateEntityWeight';
import { DatePicker } from '@/assets/icons';
import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { EntityCreateWeightScreenProps } from '@/types/routes/props/diary';

export default function CreateWeightBottomSheet({
    navigation,
    route: {
        params: { entity },
    },
}: EntityCreateWeightScreenProps) {
    const { bottom } = useSafeAreaInsets();
    const [weight, setWeight] = useState('');
    const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();

    const bottomSheetClose = useCallback(() => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
    }, [navigation]);

    const updateEntityWeight = useUpdateEntityWeight();
    const createEntityWeight = useCreateEntityWeight({
        onError: (error) => {
            if (error.statusCode === 417) {
                Alert.alert('해당 날짜에 이미 무게가 등록되어 있어요', '수정 하시겠어요?', [
                    {
                        text: '취소',
                        style: 'cancel',
                        onPress: () => {},
                    },
                    {
                        text: '수정',
                        onPress: () =>
                            updateEntityWeight.mutate({
                                diaryId: entity.id,
                                date: dayjs(selectedDate).format('YYYY-MM-DD'),
                                weight: Number(weight),
                            }),
                    },
                ]);
            }
        },
        onSuccess: () => {
            bottomSheetClose();
        },
    });

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

    const handleCreateEntityWeight = () => {
        if (weight !== undefined && weight?.length !== 0) {
            console.log(Number(weight));
            createEntityWeight.mutate({
                diaryId: entity.id,
                date: dayjs(selectedDate).format('YYYY-MM-DD'),
                weight: Number(weight),
            });
        }
    };

    return (
        <>
            <BottomSheet onClose={bottomSheetClose} snapInfo={{ pointsFromTop: [450], startIndex: 0 }} header={Header}>
                <TouchableNativeFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modalContainer}>
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

                        <View style={[styles.buttonWrapper, { marginBottom: bottom }]}>
                            <ConfirmButton
                                text="등록"
                                onPress={handleCreateEntityWeight}
                                disabled={!weight || createEntityWeight.isPending}
                            />
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

function Header() {
    return (
        <View style={headerStyles.container}>
            <Typo variant="title3">몸무게 추가</Typo>
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
    modalContainer: {
        flex: 1,
        gap: 20,
        paddingTop: 20,
        paddingHorizontal: 20,
        backgroundColor: color.White.toString(),
    },
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
    input: {
        padding: 0,
        width: 90,
    },
    buttonWrapper: {
        marginTop: 'auto',
    },
    inputContainer: {
        flexDirection: 'row',
    },
});
