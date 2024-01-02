import { useBottomSheet } from '@crawl/bottom-sheet';
import { Typo, color } from '@crawl/design-system';
import { useOnOff } from '@crawl/react-hooks';
import dayjs from 'dayjs';
import React, { useCallback, useReducer } from 'react';
import { Keyboard, Platform, Pressable, StyleSheet, TextInput, View } from 'react-native';

import DatePickerTextField from '../../components/DatePickerTextField';
import useUpdateEntityWeight from '../../hooks/mutations/useUpdateEntityWeight';
import weightReducer from '../../reducer/weight-reducer';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { WeightUnit } from '@/types/apis/diary/entity';

type UpdateWeightBottomSheetState = {
    entity: {
        id: string;
        weightUnit: WeightUnit;
        weight: number;
        date: string;
    };
};

export type UpdateWeightBottomSheetProps = UpdateWeightBottomSheetState;

export default function UpdateWeightBottomSheet({ entity }: UpdateWeightBottomSheetProps) {
    const { bottomSheetClose } = useBottomSheet();
    const { mutate, isPending } = useUpdateEntityWeight({
        onSuccess: bottomSheetClose,
    });

    const [state, dispatch] = useReducer(weightReducer, { weight: String(entity.weight), date: dayjs(entity.date).toDate() });
    const { off: datePickerOff, on: datePickerOn, state: isDatePickerVisible } = useOnOff();

    const handleConfirm = useCallback(
        (date: Date) => {
            dispatch({ type: 'SET_DATE', date });
            datePickerOff();
        },
        [datePickerOff],
    );

    const handleChangeWeight = useCallback((text: string) => {
        dispatch({ type: 'SET_WEIGHT', weight: text });
    }, []);

    const handleCreateEntityWeight = () => {
        if (state.weight?.length !== 0) {
            mutate({
                entityId: entity.id,
                date: dayjs(state.date).format('YYYY-MM-DD'),
                weight: Number(state.weight),
            });
        }
    };

    return (
        <Pressable onPress={Keyboard.dismiss} style={[styles.wrapper, styles.modalContainer]}>
            <View style={styles.inputGroup}>
                <View style={styles.content}>
                    <Typo variant="title3">{`몸무게 ${entity.weightUnit}`}</Typo>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            value={state.weight}
                            keyboardType="numeric"
                            onChangeText={handleChangeWeight}
                            style={styles.input}
                            textAlign="center"
                            autoFocus
                        />
                    </View>
                </View>
                <DatePickerTextField
                    date={state.date}
                    disabled={true}
                    isDatePickerVisible={isDatePickerVisible}
                    onPress={datePickerOn}
                    onConfirm={handleConfirm}
                    onCancel={datePickerOff}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <ConfirmButton text="등록" onPress={handleCreateEntityWeight} disabled={!state.weight || isPending} />
            </View>
        </Pressable>
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
