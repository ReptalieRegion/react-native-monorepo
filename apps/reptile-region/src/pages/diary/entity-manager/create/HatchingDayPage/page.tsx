import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import React, { useCallback, useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

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

    useFocusEffect(() => {
        if (Platform.OS === 'android') {
            DateTimePickerAndroid.open({
                value: dayjs().toDate(),
                onChange: (event, date) => {
                    if (event.type === 'set') {
                        handleChangeDate(date);
                        nextPage();
                        DateTimePickerAndroid.dismiss('date');
                    }
                },
            });
        }
    });

    useEffect(() => {
        setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: dayjs().toDate() });
    }, [setCreateEntity]);

    return (
        <CreateTemplate
            title="해칭일을 등록해주세요"
            description="등록할 개체의 해칭일을 선택해주세요."
            contents={Platform.select({
                ios: (
                    <RNDateTimePicker
                        display={Platform.select({ ios: 'spinner', android: 'default' })}
                        timeZoneName="Asia/Seoul"
                        themeVariant="light"
                        value={hatchingDate ?? currentDate}
                        maximumDate={currentDate}
                        minimumDate={dayjs(currentDate).subtract(50, 'year').toDate()}
                        onChange={(_, date) => handleChangeDate(date)}
                    />
                ),
            })}
            button={Platform.select({
                ios: (
                    <View style={styles.buttonContainer}>
                        <ConfirmButton variant="text" text="건너뛰기" onPress={handleSkipDate} />
                        <ConfirmButton size="medium" variant="confirm" text="다음" onPress={nextPage} />
                    </View>
                ),
                android: <ConfirmButton variant="text" text="건너뛰기" onPress={handleSkipDate} />,
            })}
        />
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        gap: 5,
    },
});
