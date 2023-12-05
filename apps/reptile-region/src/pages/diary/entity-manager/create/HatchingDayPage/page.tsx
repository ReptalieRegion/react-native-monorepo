import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate';
import type { EntityManagerCreateHatchingScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerHatchingDayPage({ navigation }: EntityManagerCreateHatchingScreenProps) {
    const currentDate = new Date();
    const {
        entityDate: { hatchingDate },
        setCreateEntity,
    } = useCreateEntity();

    useEffect(() => {
        setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: new Date() });
    }, [setCreateEntity]);

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

    return (
        <CreateTemplate
            title="해칭일을 등록해주세요"
            description="등록할 개체의 해칭일을 선택해주세요."
            contents={
                <RNDateTimePicker
                    display="spinner"
                    timeZoneName="Asia/Seoul"
                    themeVariant="light"
                    value={hatchingDate ?? currentDate}
                    maximumDate={currentDate}
                    minimumDate={dayjs(currentDate).subtract(50, 'year').toDate()}
                    onChange={(_, date) => handleChangeDate(date)}
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
