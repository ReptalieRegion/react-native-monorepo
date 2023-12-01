import RNDateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import React, { useCallback } from 'react';

import ConfirmButton from '@/components/@common/atoms/Button/ConfirmButton';
import useCreateEntity from '@/components/diary/organisms/CreateEntity/hooks/useCreateEntity';
import CreateTemplate from '@/components/diary/templates/CreateTemplate/CreateTemplate1';
import type { EntityManagerCreateHatchingScreenProps } from '@/types/routes/props/diary';

export default function EntityManagerHatchingDayPage({ navigation }: EntityManagerCreateHatchingScreenProps) {
    const {
        entityDate: { hatchingDate },
        setCreateEntity,
    } = useCreateEntity();

    const handleChangeDate = useCallback(
        (_: DateTimePickerEvent, date: Date | undefined) => {
            if (date) {
                setCreateEntity({ type: 'SET_HATCHING_DATE', hatchingDate: date });
            }
        },
        [setCreateEntity],
    );

    const nextPage = useCallback(() => {
        navigation.navigate('type-and-morph');
    }, [navigation]);

    return (
        <CreateTemplate
            title="해칭일을 등록해주세요."
            description="등록할 개체의 해칭일을 선택해주세요."
            contents={
                <RNDateTimePicker
                    display="spinner"
                    timeZoneName="Asia/Seoul"
                    value={hatchingDate ?? new Date()}
                    maximumDate={new Date()}
                    minimumDate={new Date(1950, 0, 1)}
                    onChange={handleChangeDate}
                />
            }
            button={<ConfirmButton text="다음" onPress={nextPage} />}
        />
    );
}
