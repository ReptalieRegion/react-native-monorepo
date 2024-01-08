import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import CreateTemplate from '../@common/components/CreateTemplate';
import useCreateEntity from '../@common/context/CreateEntity/hooks/useCreateEntity';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import type { EntityManagerCreateHatchingScreenProps } from '@/types/routes/props/diary/entity';

export default function EntityManagerHatchingDayPage({ navigation }: EntityManagerCreateHatchingScreenProps) {
    const currentDate = dayjs().toDate();
    const {
        entityDate: { hatchingDate },
        setCreateEntity,
    } = useCreateEntity();

    const handleChangeDate = useCallback(
        (date: Date | undefined) => {
            setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: date });
        },
        [setCreateEntity],
    );

    const nextPage = useCallback(() => {
        navigation.navigate('type-and-morph');
    }, [navigation]);

    const handleSkipDate = useCallback(() => {
        handleChangeDate(undefined);
        nextPage();
    }, [handleChangeDate, nextPage]);

    useEffect(() => {
        setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: dayjs().toDate() });
    }, [setCreateEntity]);

    return (
        <CreateTemplate
            title="해칭일을 등록해주세요"
            description="등록할 개체의 해칭일을 선택해주세요."
            contents={
                <DatePicker
                    date={hatchingDate ?? currentDate}
                    mode="date"
                    androidVariant="nativeAndroid"
                    maximumDate={currentDate}
                    minimumDate={dayjs(currentDate).subtract(50, 'year').toDate()}
                    onDateChange={(date) => handleChangeDate(date)}
                />
            }
            button={
                <View style={styles.buttonContainer}>
                    <ConfirmButton variant="text" text="건너뛰기" onPress={handleSkipDate} />
                    <ConfirmButton size="medium" variant="confirm" text="다음" onPress={nextPage} />
                </View>
            }
        />
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        gap: 5,
    },
});
